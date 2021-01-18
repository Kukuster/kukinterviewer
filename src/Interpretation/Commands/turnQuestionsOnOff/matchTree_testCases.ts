'use strict';

export type turnQuestionsOnOff_testCase = 
    { m: string,                                                res: { turn: 'on'|'off', questions: 'all'|number[] } | null };
export const turnQuestionsOnOff_testCases: turnQuestionsOnOff_testCase[] = [
    // [ turn -> all -> questions -> onoff ]
    { m: "Turn all questions off",                              res: { turn: 'off', questions: 'all' } },

    // [ turn -> onoff -> all -> questions ]
    { m: "Turn off all the questions",                          res: { turn: 'off', questions: 'all' } },

    // [ turn -> onoff -> all -> question ]
    { m: "Turn off each question",                              res: { turn: 'off', questions: 'all' } },

    // [ turn -> onoff -> dig -> questions ]
    { m: "turn on 2nd, 3rd and all the questions",              res: { turn: 'on',  questions: [2, 3] } },
    { m: "Turn off 3rd and 4th questions, please",              res: { turn: 'off', questions: [3, 4] } },

    // [ turn -> questions -> dig -> onoff ]
    { m: "tuRn questions 2, 3 and 5 on",                        res: { turn: 'on',  questions: [2, 3, 5] } },
    { m: "Turn questions 2 3 and 6 on",                         res: { turn: 'on',  questions: [2, 3, 6] } },
    { m: "please Turn questions 2 question4 and #5 on",         res: { turn: 'on',  questions: [2, 4, 5] } },
    { m: "how about Turning questions 2 & 7 off?",              res: { turn: 'off', questions: [2, 7] } },

    // [ turn -> questions -> dig -> N -> onoff ]
    { m: "Turn questions 2 question4 and #6 on",                res: { turn: 'on',  questions: [2, 4, 6] } },

    // [ turn -> dig -> questions -> onoff ]
    { m: "Turn 3rd and 6th questions off",                      res: { turn: 'off', questions: [3, 6] } },
    { m: "could You please turn 3rd and 7th questions off",     res: { turn: 'off', questions: [3, 7] } },

    //{ m: "Turn question2,3 and #5 on",                          res: { turn: 'on',  questions: [2, 3, 5] } },
    //{ m: "could You please Turn questions3,6 on?",              res: { turn: 'on',  questions: [3, 6] } },  //would have to figure out how to match both 'questions' and 'digits' at the same time


    // [ (en|dis)able -> questions -> dig ]
    { m: "maybe disable questions 4 & 5?",                      res: { turn: 'off', questions: [4, 5] } },
    { m: "Enable questions 2 question3 and #8",                 res: { turn: 'on',  questions: [2, 3, 8] } },
    // [ (en|dis)able -> dig -> questions ]
    { m: "enable 4nd, 6rd and all the questions",               res: { turn: 'on',  questions: [4, 6] } },
    { m: "enable 4nd, 7rd and every question",                  res: { turn: 'on',  questions: [4, 7] } },
    { m: "Disable 4rd and 8th questions, please",               res: { turn: 'off', questions: [4, 8] } },
    // [ (en|dis)able -> all -> questions ]
    { m: "Disable all the questions, please",                   res: { turn: 'off', questions: 'all' } },
    { m: "Disable every question, please",                      res: { turn: 'off', questions: 'all' } },


    // [ don't -> ask -> questions -> dig ]
    { m: "don't ask me questions #4, 6, 10",                    res: { turn: 'off',  questions: [4, 6, 10] } },
    { m: "don't ask me #4, 6, 10 questions",                    res: { turn: 'off',  questions: [4, 6, 10] } },


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
