'use strict';

export type addTagsToQuestions_testCase = 
    { m: string,                                                                           res: { Tags: string[], qids: number[] | 'all' } | null  };
export const addTagsToQuestions_testCases: addTagsToQuestions_testCase[] = [

    // add -> # -> question -> dig
    { m: "add #tag1 to the question 3",                                                    res: { 
        qids: [3],
        Tags: ['tag1']
     } },
    { m: "add #tag to questions 3, 4, 5",                                                  res: { 
        qids: [3,4,5],
        Tags: ['tag']
     } },
    { m: "would you mind adding #tag1 tag to questions 6, 7, 10? ",                        res: { 
        qids: [6,7,10],
        Tags: ['tag1']
     } },
    { m: "include #tag1 in questions 3, 4 & 6, please",                                    res: { 
        qids: [3,4,6],
        Tags:  ['tag1']
     } },
    { m: "add tags #tag1 #tag2 to question 3",                                             res: { 
        qids: [3],
        Tags: ['tag1','tag2']
     } },

    // add -> # -> all -> questions
    { m: "add #tag1 to all questions ",                                                    res: { 
        qids: 'all',
        Tags: ['tag1']
     } },

    // tag -> question -> dig -> #
    { m: "tag question 3 #tag1     ",                                                      res: { 
        qids: [3],
        Tags: ['tag1']
     } },
    { m: "tag question 3 with #tag1",                                                      res: { 
        qids: [3],
        Tags: ['tag1']
     } },
    { m: "how about tagging questions 3, 4, & 7 with #tag1?",                              res: {  
        qids: [3,4,7],
        Tags: ['tag1']
    } },

    // tag -> dig -> question -> #
    { m: "tag 3rd question #tag1   ",                                                      res: { 
        qids: [3],
        Tags: ['tag1']
     } },

    // tag -> # -> all -> questions
    { m: "tag #tag1 all questions ",                                                       res: { 
        qids: 'all',
        Tags: ['tag1']
     } },

    // get -> questions -> dig -> tag -> #
    { m: "how about letting questions 3, 4 & 5 tagged with #tag1 #tag2 ",                  res: { 
        qids: [3,4,5],
        Tags: ['tag1','tag2']
     } },


    // [ ... -> ✕ ]
    { m: "add #tag1 to questions ",                                                        res: null },
    { m: "add tag to question 3 ",                                                         res: null },

    // [ neg ]
    { m: "don't add #tag1 to question 3 ",                                                 res: null },
    { m: "add #tag3 to no questions ",                                                     res: null },

    // [ forbidden ]
    { m: "remove all tags ",                                                               res: null },
    { m: "delete all the questions ",                                                      res: null },
    { m: "delete questions 3, 4 & 5 from tags #tag1 #tag2 ",                               res: null },
    { m: "remove from questions tag #tag1 #tag2 ",                                         res: null },
    { m: "remove all tags ",                                                               res: null },


];
