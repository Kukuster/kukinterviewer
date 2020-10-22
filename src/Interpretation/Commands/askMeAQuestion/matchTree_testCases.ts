'use strict';

import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";

export type askMeAQuestion_testCase =
    { m: string,                                                                 res: questionsQuery | null };
export const askMeAQuestion_testCases: askMeAQuestion_testCase[] = [

    // next -> question
    { m: "next question ",                                                                 res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },
    { m: "next question, please ",                                                         res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },

    // ask -> me -> question
    { m: "ask me another question! ",                                                      res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },
    { m: "ask me a question, please ",                                                     res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },
    { m: "would you mind asking me more questions, please? ",                              res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },

    // ask -> me -> anything
    { m: "ask me something ",                                                              res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },
    { m: "ask me anything ",                                                               res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },

    // A -> M -> A
    { m: "A M A",                                                                          res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },
    
    // AMA
    { m: "AMA",                                                                            res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },

    // another -> question
    { m: "another question ",                                                              res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },
    { m: "a question ",                                                                    res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },
    { m: "any question, please ",                                                          res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },

    // more -> question
    { m: "one more question ",                                                             res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },
    { m: "more questions ",                                                                res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },

    // question -> please
    { m: "question, please ",                                                              res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },

    // interview me
    { m: "interview me ",                                                                  res: { 
        enabled: true, havingTagsEnabled: true, random: true
     } },


    // next -> question -> #
    { m: "next question from #web, please ",                                               res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // next -> # -> question
    { m: "next #web question ",                                                            res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // ask -> me -> # -> question
    { m: "ask me a #web question! ",                                                       res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },
    { m: "ask me any #web question! ",                                                     res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // ask -> me -> question -> #
    { m: "ask me a question from #web ",                                                   res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },
    { m: "give me a question from #web ",                                                  res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // another -> # -> question
    { m: "another #web question! ",                                                        res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // a -> # -> question
    { m: "a #web question, please! ",                                                      res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // a -> question -> #
    { m: "a question from #web ",                                                          res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // more -> # -> question
    { m: "more #web questions ",                                                           res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // more -> question -> #
    { m: "more questions on #web ",                                                        res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // # -> question -> please
    { m: "#web question, please ",                                                         res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // question -> # -> please
    { m: "question from #web, please ",                                                    res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // question -> please -> #
    { m: "question please, from #web ",                                                    res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },

    // interview -> me -> #
    { m: "interview me on #web ",                                                          res: { 
        enabled: true, havingTagsEnabled: true,
        Tags: ['web'],
        random: true
     } },


    // question -> dig
    { m: "question number 3, please ",                                                     res: { 
        qids: [3],
        random: true
     } },
    { m: "question 3 ",                                                                    res: { 
        qids: [3],
        random: true
     } },
    { m: "question of id 3 ",                                                              res: { 
        qids: [3],
        random: true
     } },

    // dig -> question
    { m: "3rd question ",                                                                  res: { 
        qids: [3],
        random: true
     } },
    { m: "ask me 3rd question ",                                                           res: { 
        qids: [3],
        random: true
     } },




    // [ ... -> ✕ ]
    { m: "question ",                                                                      res: null },

    // [ neg ]
    { m: "don't ask me questions ",                                                        res: null },
    { m: "ask me no questions ",                                                           res: null },

    // [ forbidden ]
    { m: "ask me questions ",                                                              res: null },


];