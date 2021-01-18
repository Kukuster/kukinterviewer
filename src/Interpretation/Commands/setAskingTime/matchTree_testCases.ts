import { setAskingTime_partialArgs } from "./execute";

export const setAskingTime_testBaseDate = new Date(2020, 3, 20, 20, 1);

export const setAskingTime_testBaseDate_unix = setAskingTime_testBaseDate.getTime();

export type setAskingTime_testCase = 
    { m: string,                                                                res: setAskingTime_partialArgs | null };
export const setAskingTime_testCases: setAskingTime_testCase[] = [

    /* def
    
    INTERVAL = every [-> number] -> timeunit
    FROM = from -> clock number [-> 12-hour period]
    TO =     to -> clock number [-> 12-hour period]
    AT =     at -> clock number [-> 12-hour period]

    UNTIL =              (until|before) -> clock number [-> 12-hour period]
    AFTER =                       after -> clock number [-> 12-hour period]
    NOLATER =  no[t] -> later [-> than] -> clock number [-> 12-hour period]
    
    finish = (finish|stop|end)
    start  = (start|begin)

     */

    // ask -> question[s] -> INTERVAL
    { m: "ask me questions every 5 seconds",                                                res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 5000,
        },
     } },
    { m: "ask me questions every 5 minutes",                                                res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 300000,
        },
     } },
    { m: "ask me questions every 5 hours",                                                  res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 18000000,
        },
     } },
    { m: "ask me a question every 1 hour 30 minutes",                                       res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 5400000,
        },
     } },
    { m: "ask me a question every 1.5 hours",                                               res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 5400000,
        },
     } },    
    { m: "ask me a question every 1 day",                                                   res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 86400000,
        },
     } },

    { m: "ask me a question every day",                                                   res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 86400000,
        },
     } },
    
    // not supported by parse-duration yet
    // ask -> question[s] -> INTERVAL
    { m: "ask me questions every day",                                                      res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 86400000,
        },
     } },
    { m: "ask me questions daily",                                                          res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 86400000,
        },
     } },
    { m: "ask me questions every minute",                                                   res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 60000,
        },
     } },
    { m: "ask me questions every hour",                                                     res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 3600000,
        },
     } },
    { m: "ask me questions every other day",                                                res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 172800000,
        },
     } },


     
    // ask -> question[s] -> regularly
    { m: "ask me questions regularly",                                                      res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 86400000,
        },
     } },
     
    // ask -> question[s] -> regularly -> INTERVAL
    { m: "ask me a question regularly every 1.5 hours",                                     res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 5400000,
        },
     } },
    { m: "ask me a question regularly every 1 hour",                                        res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 3600000,
        },
     } },
    // not supported by parse-duration yet
    // { m: "ask me a question regularly every hour",                                          res: {
    //     interval_ms: 3600000,
    //  } },

    // ask -> [a|any|one] -> question[s] -> AT
    { m: "ask me a question at 3:00",                                                       res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        next_unix: {
            datetime: 1587438000000,
            shiftByTimezone: true,
        },
     } },
    // next -> question[s] -> AT
    { m: "next question at 3:00",                                                           res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        next_unix: {
            datetime: 1587438000000,
            shiftByTimezone: true,
        },
     } },
    // next -> question[s] -> AT
    { m: "I want my next question to be at 3:00 pm",                                        res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        next_unix: {
            datetime: 1587481200000,
            shiftByTimezone: true,
        },
     } },
    { m: "I want my next question to be at 3:00 p.m.",                                      res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        next_unix: {
            datetime: 1587481200000,
            shiftByTimezone: true,
        },
     } },
    
    // next -> time -> ask -> me -> AT
    { m: "next time ask me at 3:00",                                                        res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        next_unix: {
            datetime: 1587438000000,
            shiftByTimezone: true,
        },
     } },
    // ask -> me -> AT -> next -> time
    { m: "ask me at 3:00 next time",                                                        res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        next_unix: {
            datetime: 1587438000000,
            shiftByTimezone: true,
        },
     } },
    // ask -> me -> number -> timeunit -> later
    { m: "ask me 3 hours later",                                                            res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        next_unix: {
            datetime: 1587423660000,
            shiftByTimezone: false,
        },
     } },
    // ask -> me -> day
    { m: "ask me tomorrow",                                                                 res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        next_unix: {
            datetime: 1587499260000,
            shiftByTimezone: false,
        },
     } },
    // ask -> me -> day
    { m: "ask me on sunday",                                                                res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        next_unix: {
            datetime: 1587931260000,
            shiftByTimezone: true,
        },
     } },
    // ask -> me -> day -> AT
    { m: "ask me on sunday at 6 p.m.",                                                      res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        next_unix: {
            datetime: 1587924000000,
            shiftByTimezone: true,
        },
     } },


     
    // ask -> question[s] -> FROM
    { m: "ask me questions from 7 am",                                                      res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        },
     } },
    // ask -> question[s] -> starting -> FROM
    { m: "ask me questions starting from 7 am",                                             res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        },
     } },
    // ask -> question[s] -> starting -> AT
    { m: "ask me questions starting at 7 am",                                               res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        },
     } },
    // start -> asking -> question[s] -> FROM
    { m: "start asking me questions from 7 am",                                             res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        },
     } },
    // start -> asking -> question[s] -> AT
    { m: "start asking me questions at 7 am",                                               res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        },
     } },
    { m: "begin asking me questions at 7 am",                                               res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        },
     } },

    
    // ask -> question[s] -> UNTIL
    { m: "ask me questions before 6 pm",                                                    res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        },
     } },
    { m: "ask me questions until 6 pm",                                                     res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        },
     } },
    // finish -> ask -> questions -> UNTIL
    { m: "finish asking me any questions before 6 pm",                                      res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        },
     } },
    // finish -> ask -> questions -> AT
    { m: "finish asking me any questions at 6 pm",                                          res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        },
     } },
    { m: "stop asking me any questions at 6 pm",                                            res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        },
     } },
    // ask -> questions -> NOLATER -> 
    { m: "ask me questions no later than 6 pm",                                             res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        },
     } },
    

    // ask -> question[s] -> FROM -> TO
    { m: "ask me questions from 10:00 to 20:00",                                            res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 72000000,
            shiftByTimezone: true,
        },
     } },
    // ask -> question[s] -> FROM -> TO
    { m: "ask me questions from 10 am to 8 pm",                                             res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 72000000,
            shiftByTimezone: true,
        },
     } },
    // ask -> question[s] -> starting -> FROM -> finishing -> AT
    { m: "ask me questions starting from 10:00 and finishing at 20:00",                     res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 72000000,
            shiftByTimezone: true,
        },
     } },
    { m: "ask me questions starting from 10:00 and finishing at 8 pm",                      res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 72000000,
            shiftByTimezone: true,
        },
     } },
    // ask -> question[s] -> starting -> FROM -> up -> UNTIL
    { m: "ask me questions starting from 10:00 up until 20:00",                             res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 72000000,
            shiftByTimezone: true,
        },
     } },
    { m: "ask me questions starting from 10 am up until 8 pm",                              res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 72000000,
            shiftByTimezone: true,
        },
     } },
    // ask -> question[s] -> start -> AT -> finishing -> AT
    { m: "ask me questions starting at 10:00, and finishing at 8 pm",                       res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 72000000,
            shiftByTimezone: true,
        },
     } },
    
    // start -> ask -> question[s] -> AT -> finish -> AT
    { m: "start asking me questions at 10:00, and finish at 8 pm",                          res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 72000000,
            shiftByTimezone: true,
        },
     } },
    { m: "start asking me questions at 20:00, and finish at 10:00",                         res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 72000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
     } },
    

    
    // ask -> question[s] -> FROM -> TO -> INTERVAL
    { m: "ask me questions from 10:00 am to 7:00 pm every 5 minutes",                       res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 300000,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 68400000,
            shiftByTimezone: true,
        },
     } },
    // ask -> question[s] -> INTERVAL -> FROM -> TO
    { m: "ask me questions every 5 minutes from 10:00 am to 7:00 pm",                       res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 300000,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 68400000,
            shiftByTimezone: true,
        },
     } },
    { m: "ask me questions every hour from 10:00 am to 7:00 pm",                          res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 3600000,
        },
        from: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 68400000,
            shiftByTimezone: true,
        },
     } },
    { m: "ask me questions every 5 minutes from 7:00 pm to 10:00 am",                       res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 300000,
        },
        from: {
            datetime: 68400000,
            shiftByTimezone: true,
        },
        to: {
            datetime: 36000000,
            shiftByTimezone: true,
        },
     } },

    // continue -> ask -> me -> UNTIL
    { m: "continue asking me until 7:00 pm",                                                res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 68400000,
            shiftByTimezone: true,
        },
     } },
    { m: "keep asking me until 7:00 p.m.",                                                    res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 68400000,
            shiftByTimezone: true,
        },
     } },
    // continue -> ask -> me -> INTERVAL -> UNTIL
    // { m: "continue asking me every minute until 7:00 pm",                                   res: {
    //     interval_ms: 60000,
    //     to: 68400000
    //  } },
    { m: "continue asking me every 1 minute until 7:00 pm",                                 res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        interval: {
            interval_ms: 60000,
        },
        to: {
            datetime: 68400000,
            shiftByTimezone: true,
        },
     } },
    
    
    
    // don't -> start -> ask -> question[s] -> UNTIL
    { m: "don't start asking me questions before 7 am",                                     res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },
    { m: "don't begin to ask me questions before 7 am",                                     res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },
    { m: "don't start to ask me questions until 7 am",                                      res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },
    { m: "don't start to ask me questions up to 7 am",                                      res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },
    { m: "don't start to ask me questions up until 7 am",                                   res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },    
    // don't -> ask -> question[s] -> UNTIL
    { m: "don't ask me questions before 7 am",                                              res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },
    { m: "don't ask me earlier than 7 am",                                                  res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },
    
    // don't -> finish -> ask -> question[s] -> UNTIL
    { m: "don't stop asking me any questions before 6 pm",                                  res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        }
     } },
    { m: "don't finish asking me questions until 6 pm",                                     res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        }
     } },
     
    // don't -> ask -> question[s] -> UNTIL
    { m: "don't continue asking me questions after 6 pm",                                   res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        }
     } },
    // don't -> ask -> question[s] -> AFTER
    { m: "don't ask me questions after 6 pm",                                               res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        }
     } },
    { m: "don't ask me any question after 6 pm",                                            res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        }
     } },

    
    // ask -> no -> question[s] -> UNTIL
    { m: "ask me no questions before 7 am",                                                 res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },
    { m: "ask me no questions until 7 am",                                                  res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },
    { m: "ask me no questions up to 7 am",                                                  res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },
    { m: "ask me no questions up until 7 am",                                               res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        from: {
            datetime: 25200000,
            shiftByTimezone: true,
        }
     } },
    { m: "ask me no questions after 6 pm",                                                  res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        }
     } },
    { m: "ask me no questions after 6 pm",                                                  res: {
        now: {
            datetime: setAskingTime_testBaseDate_unix,
            shiftByTimezone: false,
        },
        to: {
            datetime: 64800000,
            shiftByTimezone: true,
        }
     } },
    
    


    


    
     
    // [ ... -> ✕ ]
    { m: "question",                                                                        res: null },

    // [ neg ]
    { m: "don't ask me questions",                                                          res: null },
    { m: "stop asking me questions",                                                        res: null },
    { m: "ask me no questions ",                                                            res: null },

    // ask -> question[s] -> ✕
    { m: "ask me questions ",                                                               res: null },
    { m: "ask me",                                                                          res: null },
    
    
    
    
     /*
    
    { m: "ask me questions every 5 seconds",                  res: {
        
     } },
    
    { m: "ask me questions every 5 seconds",                  res: {
        
     } },
    
    { m: "ask me questions every 5 seconds",                  res: {
        
     } },
    
/**
 * 
 */
    
    
];
