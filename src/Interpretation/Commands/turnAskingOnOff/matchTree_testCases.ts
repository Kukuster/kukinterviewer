import { shoot } from "./matchTree";

export type turnAskingOnOff_testCase = 
    { m: string,                                        res: shoot | null };
export const turnAskingOnOff_testCases: turnAskingOnOff_testCase[] = [
    { m: "enable bot",                                          res: 'on' },
    { m: "enable asking",                                       res: 'on' },
    { m: "enable interview",                                    res: 'on' },

    { m: "activate bot",                                        res: 'on' },
    { m: "activate asking",                                     res: 'on' },
    { m: "activate interviewing",                               res: 'on' },

    { m: "start bot",                                           res: 'on' },
    { m: "start asking",                                        res: 'on' },
    { m: "start interviewing",                                  res: 'on' },
        
    { m: "begin bot",                                           res: 'on' },
    { m: "begin asking",                                        res: 'on' },
    { m: "begin interviewing",                                  res: 'on' },

    { m: "launch bot",                                          res: 'on' },
    { m: "launch asking",                                       res: 'on' },
    { m: "launch interviewing",                                 res: 'on' },

    { m: "run bot",                                             res: 'on' },
    { m: "run asking",                                          res: 'on' },
    { m: "run interviewing",                                    res: 'on' },

    { m: "turn on bot",                                         res: 'on' },
    { m: "turn on asking",                                      res: 'on' },
    { m: "turn on interviewing",                                res: 'on' },

    { m: "turn bot on",                                         res: 'on' },
    { m: "turn asking on",                                      res: 'on' },
    { m: "turn interviewing on",                                res: 'on' },

    { m: "switch on bot",                                       res: 'on' },
    { m: "switch on asking",                                    res: 'on' },
    { m: "switch on interviewing",                              res: 'on' },

    { m: "switch bot on",                                       res: 'on' },
    { m: "switch asking on",                                    res: 'on' },
    { m: "switch interviewing on",                              res: 'on' },


    

    { m: "keep bot",                                            res: 'on' },
    { m: "keep asking",                                         res: 'on' },
    { m: "keep interviewing",                                   res: 'on' },
    
    { m: "continue",                                            res: 'on' },
    { m: "continue bot",                                        res: 'on' },
    { m: "continue asking",                                     res: 'on' },
    { m: "continue interviewing",                               res: 'on' },

    { m: "resume",                                              res: 'on' },
    { m: "resume bot",                                          res: 'on' },
    { m: "resume asking",                                       res: 'on' },
    { m: "resume interviewing",                                 res: 'on' },




    { m: "disable bot",                                         res: 'off' },
    { m: "disable asking",                                      res: 'off' },
    { m: "disable interviewing",                                res: 'off' },

    { m: "deactivate bot",                                      res: 'off' },
    { m: "deactivate asking",                                   res: 'off' },
    { m: "deactivate interviewing",                             res: 'off' },
    
    { m: "finish bot",                                          res: 'off' },
    { m: "finish asking",                                       res: 'off' },        
    { m: "finish interviewing",                                 res: 'off' },        
    
    { m: "end bot",                                             res: 'off' },
    { m: "end asking",                                          res: 'off' },
    { m: "end interviewing",                                    res: 'off' },
    
    { m: "cancel bot",                                          res: 'off' },
    { m: "cancel asking",                                       res: 'off' },
    { m: "cancel interviewing",                                 res: 'off' },
    
    { m: "stop bot",                                            res: 'off' },
    { m: "stop asking",                                         res: 'off' },
    { m: "stop interviewing",                                   res: 'off' },
    
    { m: "turn off bot",                                        res: 'off' },
    { m: "turn off asking",                                     res: 'off' },
    { m: "turn off interviewing",                               res: 'off' },
    
    { m: "turn bot off",                                        res: 'off' },
    { m: "turn asking off",                                     res: 'off' },
    { m: "turn interviewing off",                               res: 'off' },
    
    { m: "switch off bot",                                      res: 'off' },
    { m: "switch off asking",                                   res: 'off' },
    { m: "switch off interviewing",                             res: 'off' },
    
    { m: "switch bot off",                                      res: 'off' },
    { m: "switch asking off",                                   res: 'off' },
    { m: "switch interviewing off",                             res: 'off' },

    

    { m: "lets be without asking any questions by now",         res: 'off' },
    { m: "lets keep without asking any questions by now",       res: 'off' },





    { m: "don't ask me",                                        res: 'off' },
    { m: "don't interview",                                     res: 'off' },
    { m: "don't keep asking me",                                res: 'off' },
    { m: "don't keep interviewing me",                          res: 'off' },
    { m: "don't continue asking me",                            res: 'off' },
    { m: "don't continue interviewing",                         res: 'off' },
    { m: "don't continue",                                      res: 'off' },
    { m: "don't resume",                                        res: 'off' },
    { m: "don't resume",                                        res: 'off' },








    { m: "ask me no questions after 6 p.m.",                    res: null },






];

