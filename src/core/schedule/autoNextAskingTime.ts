import { getDateWithoutTime, getTimeWithoutDate } from "../../reusable/datetime";


export default function autoNextAskingTime(args: {
    now: Date,
    interval_ms: number,
    asking_timeOfDay_from: number,
    asking_timeOfDay_to: number,
})
{
    const now = args.now.getTime();
    const timeOfDay_from = args.asking_timeOfDay_from;
    const timeOfDay_to   = args.asking_timeOfDay_to;

    const withinWindow = (date: Date | number, from: number, to: number) => 
        from < to ?
            getTimeWithoutDate(date) >= from &&
            getTimeWithoutDate(date) <= to
            :
            getTimeWithoutDate(date) <= to ||
            getTimeWithoutDate(date) >= from;


    let nextAskingTime_candidate: number;
    
    const afterAnInterval = now + args.interval_ms;
    // 1. If the askingInterval later from now is within the asking window, then return that time
    nextAskingTime_candidate = afterAnInterval;
    if (withinWindow(nextAskingTime_candidate, timeOfDay_from, timeOfDay_to)){
        return nextAskingTime_candidate;
    }



    const today = getDateWithoutTime(args.now).getTime();
    const thatDay_afterAnInterval = getDateWithoutTime(afterAnInterval);
    const nextDay_afterAnInterval_date = new Date(thatDay_afterAnInterval); nextDay_afterAnInterval_date.setDate(nextDay_afterAnInterval_date.getDate() + 1);
    const nextDay_afterAnInterval = nextDay_afterAnInterval_date.getTime();

    
    const firstForthcomingFrom_afterAnInterval = 
        (thatDay_afterAnInterval + args.asking_timeOfDay_from ) > afterAnInterval ?
            thatDay_afterAnInterval + args.asking_timeOfDay_from :
            nextDay_afterAnInterval + args.asking_timeOfDay_from ;    

    // N - the smallest whole number of intervals from now that add up at least up to the first forthcoming from
    const N = Math.ceil((firstForthcomingFrom_afterAnInterval - now)/args.interval_ms);
    const N_intervals_afterNow = N * args.interval_ms;

    // 2. Given the N
    // if adding such N intervals to now is within the window of the next day, then return that time
    // if not, it means that the interval is bigger than the timeOfDay window, then return the forthcoming_from time
    nextAskingTime_candidate = now + N_intervals_afterNow;
    //// !!! see Model #3 !!! ////
    if (withinWindow(nextAskingTime_candidate, timeOfDay_from, timeOfDay_to)){
        return nextAskingTime_candidate;
    } else {
        return firstForthcomingFrom_afterAnInterval;
    }


}
