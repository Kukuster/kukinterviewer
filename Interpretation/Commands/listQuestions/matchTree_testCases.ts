import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";

export type listQuestions_testCase = 
    { m: string,                                                res: questionsQuery | 'all' | null };
export const listQuestions_testCases: listQuestions_testCase[] = [
    // [list -> all]
    { m: "list all untagged questions",
      res: {
            Tags: 'no'
        } },
    
    { m: "list all not tagged questions",
      res: {
            Tags: 'no'
        } },

    { m: "list all turned on questions",
      res: {
            enabled: true
        } },

    { m: "list all disabled questions",
      res: {
            enabled: false
        } },

    { m: "show me all disabled questions",
      res: {
            enabled: false
        } },

    { m: "list all not turned on questions",
      res: {
            enabled: false
        } },

    { m: "list all not enabled questions",
      res: {
            enabled: false
        } },

    { m: "list all #web questions",
      res: {
            Tags: ['web']
        } },


    // [list -> all -> questions]

    { m: "list all questions",
      res: 'all' },

    { m: "list all added question",
      res: 'all' },

    { m: "list all added questions",
      res: 'all' },

    { m: "list all questions that are untagged",
      res: {
          Tags: 'no'
        } },

    { m: "could you please do me a favor and list all questions that have no tags?",
      res: {
            Tags: 'no'
        } },
        
    { m: "list all questions with not a single tag",
      res: {
          Tags: 'no'
        } },

    { m: "can I please get all questions that are turned on?",
      res: {
            enabled: true
        } },

    { m: "please, list all questions that are tagged #web",
      res: {
            Tags: ['web']
        } },
        
    { m: "list all the questions without any tags",
      res: {
            Tags: 'no'
        } },

    { m: "would you mind listing all the questions for me?",
      res: 'all' },

    { m: "list all the questions tagged #web",
      res: {
            Tags: ['web']
        } },
        
    { m: "list all the questions with #tag1 tag",
      res: {
          Tags: ['tag']
        } },

    { m: "list all questions that are #web",
      res: {
          Tags: ['web']
        } },



    // [list -> questions]

    { m: "list question #3",
      res: {
            qids: [3]
        } },

    { m: "list questions 3, 4 & 5",
      res: {
            qids: [3, 4, 5]
        } },

    { m: "list question 3, questions 4 and question 6",
      res: {
            qids: [3, 4, 6]
        } },
        
    { m: "list questions tagged #web",
      res: {
            Tags: ['web']
        } },

    { m: "list questions with #web tag",
      res: {
          Tags: ['web']
        } },

    { m: "list questions that are about #web",
      res: {
          Tags: ['web']
        } },
        
    { m: "list questions without tags",
      res: {
          Tags: 'no'
        } },

    { m: "list questions that have no tags",
      res: {
          Tags: 'no'
        } },

    { m: "list questions that don't have any tag",
      res: {
          Tags: 'no'
        } },
        
    { m: "list questions that are not disabled",
      res: {
            enabled: true
        } },

    { m: "list questions that are untagged",
      res: {
          Tags: 'no'
        } },

    { m: "list questions that are turned on",
      res: {
          enabled: true
        } },

    { m: "list questions which are enabled",
      res: {
          enabled: true
        } },
        
    { m: "list those questions which haven't been turned off",
      res: {
          enabled: true
        } },


    // list -> [(en|dis)able, turn, #, tag, untagged, no, N, dig]

    { m: "list disabled questions",
      res: {
            enabled: false,
        } },

    { m: "list turned on questions",
      res: {
            enabled: true
        } },
        
    { m: "list untagged questions",
      res: {
            Tags: 'no'
        } },

    { m: "list not tagged questions",
      res: {
          Tags: 'no'
        } },

    { m: "list not untagged questions",
      res: {
          Tags: 'any'
        } },
        
    { m: "list not enabled questions",
      res: {
            enabled: false
        } },

    { m: "list not turned on questions",
      res: {
            enabled: false
        } },

    { m: "list 3rd & 4th questions",
      res: {
            qids: [3, 4]
        } },

    { m: "list #3 and #6 questions",
      res: {
          qids: [3, 6]
        } },
        
    { m: "list tagged questions",
      res: {
            Tags: 'any'
        } },

    { m: "list tagged #web questions",
      res: {
          Tags: ['web']
        } },

    { m: "list #web questions",
      res: {
          Tags: ['web']
        } },


     // [ forbidden ]
        
    { m: "add list all questions",              res: null },

    { m: "insert list of questions",              res: null },

    // [ ... -> frb ]

    { m: "list delete question 3",              res: null },

    { m: "list deleted question",              res: null },

    { m: "list remove question 3, 4",              res: null },

    { m: "list all not deleted questions",              res: null },

    // [ ... -> ✕ ]

    { m: "list gnilist",              res: null },
    
    { m: "list question",              res: null },

    { m: "list all questions without anything",              res: null },

    // [ neg ]

    { m: "don't list me the following questions: 3, 4, 6",              res: null },

    { m: "never list me all the questions",              res: null },

    // [ wrong_path ]

    { m: "list turned off tags",              res: null },

    { m: "would you mind listing disabled tags questions",              res: null },

    { m: "show questioned tags",              res: null },

    { m: "list enabled tags",              res: null },
    
    { m: "questions tagged listed",              res: null },

    { m: "list tag question",              res: null },


];