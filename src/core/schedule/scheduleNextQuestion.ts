import { scheduleJob } from "node-schedule";
import askMeAQuestion_execute from "../../Interpretation/Commands/askMeAQuestion/execute";
import display_raw from "../../Interpretation/Commands/display_raw";
import getChatProperty from "../sheet/methods/chat/getChatProperty";
import getSettings from "../sheet/methods/chat/getSettings";
import autoNextAskingTime from "./autoNextAskingTime";



export const runScheduledQuestion = async (chatId: number, scheduleDatetime: Date) => {
    console.log(`going to ask a scheduled question for chatId=${chatId}, at ${scheduleDatetime.toDateString()} ${scheduleDatetime.toTimeString()}`);
    const nextQuestionTime = (await getChatProperty(chatId, 'next_question'))?.getTime();
    const rightNow = (new Date()).getTime();

    if (nextQuestionTime && (nextQuestionTime <= rightNow)) {
        const result = await askMeAQuestion_execute(chatId, {
            enabled: true, havingTagsEnabled: true, random: true
        });
        const display = await display_raw(chatId, result);
        const settings = await getSettings(chatId);
        if (result && result.response.questionsLeft && settings.enabled) {
            if (settings.asking_period_ms && settings.asking_timeOfDay_from && settings.asking_timeOfDay_to) {
                const nextTime = autoNextAskingTime({
                    now: scheduleDatetime,
                    interval_ms: settings.asking_period_ms,
                    asking_timeOfDay_from: settings.asking_timeOfDay_from,
                    asking_timeOfDay_to: settings.asking_timeOfDay_to,
                });
                scheduleNextQuestion(chatId, new Date(nextTime));
            }
        }
        return result;
    }
}



export default async function scheduleNextQuestion(chatId: number, datetime: Date | 'auto') {

    let scheduleDatetime: Date;
    const now = (new Date()).getTime();

    if (datetime === 'auto') {
        const settings = await getSettings(chatId);
        if (settings.enabled && settings.asking_period_ms && settings.asking_timeOfDay_from && settings.asking_timeOfDay_to) {
            scheduleDatetime = new Date(autoNextAskingTime({
                now: new Date(),
                interval_ms: settings.asking_period_ms,
                asking_timeOfDay_from: settings.asking_timeOfDay_from,
                asking_timeOfDay_to: settings.asking_timeOfDay_to,
            }));
        } else {
            return null;
        }
    } else {
        scheduleDatetime = datetime;
    }

    console.log({ scheduleDatetime: scheduleDatetime.getTime(), now });
    // if scheduleDatetime is within a second from now, don't schedule but execute right away
    if (scheduleDatetime.getTime() - 1000 <= now) {
        return runScheduledQuestion(chatId, scheduleDatetime);
    } else {
        console.log(`scheduling a question for chatId=${chatId}, at ${scheduleDatetime.toDateString()} ${scheduleDatetime.toTimeString()}`);
        return scheduleJob(scheduleDatetime, runScheduledQuestion.bind(null, chatId, scheduleDatetime));
    }

}
