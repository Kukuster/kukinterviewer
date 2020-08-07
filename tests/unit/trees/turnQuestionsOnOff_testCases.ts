export type turnQuestionsOfOff_testCase = 
    { m: string,                                                res: { turn: string, questions: string|number[] } | null };
export const turnQuestionsOnOff_testCases: turnQuestionsOfOff_testCase[] = [
    // [ turn -> all -> questions -> onoff ]
    { m: "Turn all questions off",                              res: { turn: 'off', questions: 'all' } },

    // [ turn -> onoff -> all -> questions ]
    { m: "Turn off all the questions",                          res: { turn: 'off', questions: 'all' } },

    // [ turn -> onoff -> dig -> questions ]
    { m: "turn on 2nd, 3rd and all the questions",              res: { turn: 'on',  questions: [2, 3] } },
    { m: "Turn off 3rd and 4th questions, please",              res: { turn: 'off', questions: [3, 4] } },

    // [ turn -> questions -> dig -> onoff ]
    { m: "tuRn questions 2, 3 and 5 on",                        res: { turn: 'on',  questions: [2, 3, 5] } },
    { m: "Turn questions 2 3 and 5 on",                         res: { turn: 'on',  questions: [2, 3, 5] } },
    { m: "please Turn questions 2 question3 and #5 on",         res: { turn: 'on',  questions: [2, 3, 5] } },
    { m: "hey, how about Turning questions 2 & 7 off?",         res: { turn: 'off', questions: [2, 7] } },

    // [ turn -> questions -> dig -> N -> onoff ]
    { m: "Turn questions 2 question3 and #5 on",                res: { turn: 'on',  questions: [2, 3, 5] } },

    // [ turn -> dig -> questions -> onoff ]
    { m: "Turn 3rd and 4th questions off",                      res: { turn: 'off', questions: [3, 4] } },
    { m: "could You please turn 3rd and 4th questions off",     res: { turn: 'off', questions: [3, 4] } },

    //{ m: "Turn question2,3 and #5 on",                          res: { turn: 'on',  questions: [2, 3, 5] } },
    //{ m: "could You please Turn questions3,6 on?",              res: { turn: 'on',  questions: [3, 6] } },  //would have to figure out how to match both 'questions' and 'digits' at the same time


    // [ (en|dis)able -> questions -> dig ]
    { m: "hey, maybe disable questions 2 & 7?",                 res: { turn: 'off', questions: [2, 7] } },
    { m: "Enable questions 2 question3 and #5",                 res: { turn: 'on',  questions: [2, 3, 5] } },
    // [ (en|dis)able -> dig -> questions ]
    { m: "enable 2nd, 3rd and all the questions",               res: { turn: 'on',  questions: [2, 3] } },
    { m: "Disable 3rd and 4th questions, please",               res: { turn: 'off', questions: [3, 4] } },
    // [ (en|dis)able -> all -> questions ]
    { m: "Disable all the questions, please",                   res: { turn: 'off', questions: 'all' } },


    // [ ✕ ]
    { m: "",                                                    res: null },
    { m: "all questions off",                                   res: null },

    // [ turn -> all -> ✕ ]
    { m: "turn all",                                            res: null },
    // [ turn -> questions -> onoff -> ✕ ]
    { m: "2, 3 and 5 turn questions off",                       res: null },
    { m: "can you turn questions off, please?",                 res: null },
    // [ turn -> onoff -> ✕ ]
    { m: "turn the hell off",                                   res: null },
    // [ turn -> dig -> questions -> ✕ ]
    { m: "turn 2, 3 and all the questions",                     res: null },

    // [ (en|dis)able -> questions -> ✕ ]
    { m: "can you disable questions, please?",                  res: null },
    // [ (en|dis)able -> all -> ✕ ]
    { m: "disable all",                                         res: null },
];
