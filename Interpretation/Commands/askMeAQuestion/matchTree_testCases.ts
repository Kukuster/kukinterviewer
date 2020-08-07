'use strict';

export type askMeAQuestion_testCase =
    { m: string,                                                                 res: { qid?: number, Tags?: string[] } | null };
export const askMeAQuestion_testCases: askMeAQuestion_testCase[] = [

    // next -> question
    { m: "next question ",                                                                 res: {  } },
    { m: "next question, please ",                                                         res: {  } },

    // ask -> me -> question
    { m: "ask me another question! ",                                                      res: {  } },
    { m: "ask me a question, please ",                                                     res: {  } },
    { m: "would you mind asking me more questions, please? ",                              res: {  } },

    // ask -> me -> anything
    { m: "ask me something ",                                                              res: {  } },
    { m: "ask me anything ",                                                               res: {  } },

    // A -> M -> A
    { m: "A M A",                                                                          res: {  } },
    
    // AMA
    { m: "AMA",                                                                            res: {  } },

    // another -> question
    { m: "another question ",                                                              res: {  } },
    { m: "a question ",                                                                    res: {  } },
    { m: "any question, please ",                                                          res: {  } },

    // more -> question
    { m: "one more question ",                                                             res: {  } },
    { m: "more questions ",                                                                res: {  } },

    // question -> please
    { m: "question, please ",                                                              res: {  } },

    // interview me
    { m: "interview me ",                                                                  res: {  } },


    // next -> question -> #
    { m: "next question from #web, please ",                                               res: { 
        Tags: ['#web']
     } },

    // next -> # -> question
    { m: "next #web question ",                                                            res: { 
        Tags: ['#web']
     } },

    // ask -> me -> # -> question
    { m: "ask me a #web question! ",                                                       res: { 
        Tags: ['#web']
     } },
    { m: "ask me any #web question! ",                                                     res: { 
        Tags: ['#web']
     } },

    // ask -> me -> question -> #
    { m: "ask me a question from #web ",                                                   res: { 
        Tags: ['#web']
     } },
    { m: "give me a question from #web ",                                                  res: { 
        Tags: ['#web']
     } },

    // another -> # -> question
    { m: "another #web question! ",                                                        res: { 
        Tags: ['#web']
     } },

    // a -> # -> question
    { m: "a #web question, please! ",                                                      res: { 
        Tags: ['#web']
     } },

    // a -> question -> #
    { m: "a question from #web ",                                                          res: { 
        Tags: ['#web']
     } },

    // more -> # -> question
    { m: "more #web questions ",                                                           res: { 
        Tags: ['#web']
     } },

    // more -> question -> #
    { m: "more questions on #web ",                                                        res: { 
        Tags: ['#web']
     } },

    // # -> question -> please
    { m: "#web question, please ",                                                         res: { 
        Tags: ['#web']
     } },

    // question -> # -> please
    { m: "question from #web, please ",                                                    res: { 
        Tags: ['#web']
     } },

    // question -> please -> #
    { m: "question please, from #web ",                                                    res: { 
        Tags: ['#web']
     } },

    // interview -> me -> #
    { m: "interview me on #web ",                                                          res: { 
        Tags: ['#web']
     } },


    // question -> dig
    { m: "question number 3, please ",                                                     res: { 
        qid: 3
     } },
    { m: "question 3 ",                                                                    res: { 
        qid: 3
     } },
    { m: "question of id 3 ",                                                              res: { 
        qid: 3
     } },

    // dig -> question
    { m: "3rd question ",                                                                  res: { 
        qid: 3
     } },
    { m: "ask me 3rd question ",                                                           res: { 
        qid: 3
     } },




    // [ ... -> ✕ ]
    { m: "question ",                                                                      res: null },

    // [ neg ]
    { m: "don't ask me questions ",                                                        res: null },
    { m: "ask me no questions ",                                                           res: null },

    // [ forbidden ]
    { m: "ask me questions ",                                                              res: null },


];