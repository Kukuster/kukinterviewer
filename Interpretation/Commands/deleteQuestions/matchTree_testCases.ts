'use strict';

import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";

export type deleteQuestions_testCase = 
    { m: string,                                                       res: questionsQuery | 'all' | null };
export const deleteQuestions_testCases: deleteQuestions_testCase[] = [

    // delete -> all
    { m: "delete all untagged questions ",                             res: { 
        Tags: 'no'
     } },
    { m: "delete all not tagged questions ",                           res: { 
        Tags: 'no'
     } },
    { m: "delete all turned off questions ",                           res: { 
        enabled: false
     } },
    { m: "delete all disabled questions ",                             res: { 
        enabled: false
     } },
    { m: "delete all #todelete questions ",                            res: { 
        Tags: ['todelete']
     } },
    { m: "erase all #todelete questions ",                             res: { 
        Tags: ['todelete']
     } },
    { m: "delete all not turned on questions ",                        res: { 
        enabled: false
     } },
    { m: "delete all not tagged questions ",                           res: { 
        Tags: 'no'
     } },
    { m: "delete all not enabled questions ",                          res: { 
        enabled: false
     } },

    // delete -> all -> questions
    { m: "delete all the questions ",                                  res: 'all' },
    { m: "delete all added question ",                                 res: 'all' },
    { m: "delete all added questions ",                                res: 'all' },
    { m: "delete all questions that are untagged ",                    res: { 
        Tags: 'no'
     } },
    { m: "could you please do me a favor and delete all questions that have no tags?", res: { 
        Tags: 'no'
     } },
    { m: "delete all questions with not a single tag ",                res: { 
        Tags: 'no'
     } },
    { m: "delete all questions without a single tag ",                 res: { 
        Tags: 'no'
     } },
    { m: "delete all the questions without any tags ",                 res: { 
        Tags: 'no'
     } },
    { m: "can you please delete all questions that are turned on? ",   res: { 
        enabled: true
     } },
    { m: "delete all the questions that are turned off ",              res: { 
        enabled: false
     } },
    { m: "delete all questions tagged #todelete ",                     res: { 
        Tags: ['todelete']
     } },

    { m: "would you mind deleting all the questions for me? ",         res: 'all' },
    { m: "delete all the questions tagged #web ",                      res: { 
        Tags: ['web']
     } },
    { m: "delete all the questions with #tag1 tag ",                   res: { 
        Tags: ['tag1']
     } },
    { m: "delete all questions that are #web ",                        res: { 
        Tags: ['web']
     } },
    { m: "delete all questions from the #web ",                        res: { 
        Tags: ['web']
     } },
    { m: "delete those questions which are from the tag #web",         res: { 
        Tags: ['web']
     } },
    { m: "delete those questions which are from the #web tag",         res: { 
        Tags: ['web']
     } },

    // delete -> questions
    { m: "delete question #3  ",                                       res: { 
        qids: [3]
     } },
    { m: "delete questions 3, 4 & 5 ",                                 res: { 
        qids: [3,4,5]
     } },
    { m: "remove question 4 ",                                         res: { 
        qids: [4]
     } },
    { m: "delete question 3, questions 4 and question 6 ",             res: { 
        qids: [3,4,6]
     } },
    { m: "delete questions with #todelete tag ",                       res: { 
        Tags: ['todelete']
     } },
    { m: "delete questions tagged #web ",                              res: { 
        Tags: ['web']
     } },
    { m: "delete questions with #web tag ",                            res: { 
        Tags: ['web']
     } },
    { m: "delete questions that are about #web ",                      res: { 
        Tags: ['web']
     } },
    { m: "delete questions without tags ",                             res: { 
        Tags: 'no'
     } },
    { m: "delete questions that have no tags ",                        res: { 
        Tags: 'no'
     } },
    { m: "delete questions that don't have any tag ",                  res: { 
        Tags: 'no'
     } },
    { m: "delete questions that are not disabled ",                    res: { 
        enabled: true
     } },
    { m: "delete questions that are untagged ",                        res: { 
        Tags: 'no'
     } },
    { m: "delete questions that are turned on ",                       res: { 
        enabled: true
     } },
    { m: "delete questions which are enabled ",                        res: { 
        enabled: true
     } },
    { m: "delete those questions which haven't been turned off ",      res: { 
        enabled: true
     } },

    // delete -> [(en|dis)able, turn, #, tag, untagged, no, N, dig]
    { m: "delete disabled questions ",                                 res: { 
        enabled: false
     } },
    { m: "delete turned on questions ",                                res: { 
        enabled: true
     } },
    { m: "delete untagged questions ",                                 res: { 
        Tags: 'no'
     } },
    { m: "delete not tagged questions ",                               res: { 
        Tags: 'no'
     } },
    { m: "delete not untagged questions ",                             res: { 
        Tags: 'any'
     } },
    { m: "delete not enabled questions ",                              res: { 
        enabled: false
     } },
    { m: "delete not turned on questions ",                            res: { 
        enabled: false
     } },
    { m: "delete 3rd & 5th questions ",                                res: { 
        qids: [3,5]
     } },
    { m: "delete #4 and #5 questions ",                                res: { 
        qids: [4,5]
     } },
    { m: "could you please delete 3rd, 5th and 10th questions? ",      res: { 
        qids: [3,5,10]
     } },
    { m: "delete tagged questions ",                                   res: { 
        Tags: 'any'
     } },
    { m: "delete tagged #web questions ",                              res: { 
        Tags: ['web']
     } },
    { m: "delete #web questions ",                                     res: { 
        Tags: ['web']
     } },


    
    // [ forbidden ]
    { m: "list delete ",                                               res: null },
    { m: "add delete all questions ",                                  res: null },
    { m: "insert delete of questions ",                                res: null },
    { m: "turn delete off questions all ",                             res: null },
    { m: "search and delete questions that are turned off ",           res: null },

    // [ ... -> forbidden ]
    { m: "delete listed questions ",                                   res: null },
    { m: "delete add question 3 ",                                     res: null },
    { m: "delete next question ",                                      res: null },
    { m: "delete ask question 3, 4 ",                                  res: null },
    { m: "delete all tags question ",                                  res: null },
    //should be included, but currently doesn't pass//{ m: "delete all questions tags ",                                 res: null },
    { m: "delete searched questions ",                                 res: null },

    // [ ... -> ✕ ]
    { m: "delete gnelete ",                                            res: null },
    { m: "delete yourself, fucking bot ",                              res: null },
    { m: "delete turn off ",                                           res: null },
    { m: "delete question ",                                           res: null },
    { m: "delete all questions without anything ",                     res: null },
    { m: "delete all not questions ",                                  res: null },

    // [ negation ]
    { m: "don't delete the following questions: 3, 4, 6 ",             res: null },
    { m: "never delete all the questions ",                            res: null },

    // [ wrong_path ]
    { m: "delete turned off tags ",                                    res: null },
    { m: "would you mind deleting disabled tags questions? ",          res: null },
    { m: "delete questioned tags ",                                    res: null },
    { m: "delete enabled tags ",                                       res: null },
    { m: "questions tagged deleted ",                                  res: null },
    { m: "delete tag question ",                                       res: null },



    // (maybe) ✓ delete questions with #todelete tag that are disabled [ -> # -> tag -> (en|dis)abled ]
    // (maybe) ✓ delete all #todelete questions that are turned off [ delete -> all -> # -> questions -> turn -> onoff ]
    // (maybe) ✓ delete all enabled #todelete questions [ delete -> all -> (en|dis)able -> # -> questions ]


];  
