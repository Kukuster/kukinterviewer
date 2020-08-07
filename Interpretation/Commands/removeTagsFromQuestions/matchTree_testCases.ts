import { tagsQuery } from "../../../core/sheet/methods/tags/getTags";

export type removeTagsFromQuestions_testCase = 
    { m: string,                                                res: { Tags: string[] | 'all', qids: number[] | 'all' } | null };
export const removeTagsFromQuestions_testCases: removeTagsFromQuestions_testCase[] = [

    // remove -> # -> question -> dig
    { m: "remove #tag1 from question 3  ",                                                 res: { 
        qids: [3],
        Tags: ['tag1']
     } },
    { m: "erase #tag1 from questions 4, 5, 6 ",                                            res: { 
        qids: [3,4,5],
        Tags: ['tag1']
     } },

    // remove -> # -> all -> questions
    { m: "remove tag #tag1 from all questions ",                                           res: { 
        qids: 'all',
        Tags: ['tag1']
     } },

    // untag -> questions -> dig
    { m: "what about untagging questions 3, 4 & 5? ",                                      res: { 
        qids: [3,4,5],
        Tags: 'all'
     } },

    // remove -> all -> tags -> questions -> dig
    { m: "remove all tags from questions 3, 4, 5 ",                                        res: { 
        qids: [3, 4, 5],
        Tags: 'all'
     } },

    // untag -> all -> questions
    { m: "untag all questions",                                                            res: { 
        qids: 'all',
        Tags: 'all'
     } },

    // remove -> all -> tags -> all -> questions
    { m: "remove all tags from all questions",                                             res: { 
        qids: 'all',
        Tags: 'all'
     } },


    // untag -> # -> all -> questions
    { m: "untag #tag1 from all questions ",                                                res: { 
        qids: 'all',
        Tags: ['tag1']
     } },



    // [ wrong_path ]
    { m: "delete all the questions ",                                                      res: null },
    { m: "delete questions 3, 4 & 5 from tags #tag1 #tag2 ",                               res: null },
    { m: "remove from questions tag #tag1 #tag2 ",                                         res: null },

    // [ ... -> ✕ ]
    { m: "remove all tags ",                                                               res: null },

    // [ neg ]
    { m: "don't remove all tags ",                                                         res: null },
    { m: "remove #tag1 from no questions ",                                                res: null },

    // [ forbidden ]
    { m: "add #tag1 to questions ",                                                        res: null },
    { m: "add tag to question 3 ",                                                         res: null },
    { m: "remove add tag #web to question 3 ",                                             res: null },

];