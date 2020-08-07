import { tagsQuery } from "../../../core/sheet/methods/tags/getTags";

export type listTags_testCase = 
    { m: string,                                                res: tagsQuery | 'all' | null };
export const listTags_testCases: listTags_testCase[] = [

    // list -> all
  
    { m: "list all turned on tags",
      res: {
          enabled: true
        } },
    
    { m: "list all disabled tags",
      res: {
          enabled: false
        } },

    { m: "show me all disabled tags",
      res: {
        enabled: false
        } },
    
    { m: "list all not turned on tags",
      res: {
        enabled: false
        } },

    { m: "list all not enabled tags",
      res: {
        enabled: false
        } },
    

    // list -> all -> tags

    { m: "list all tags",
      res: 'all' },

    { m: "list all added tag",
      res: 'all' },
    
    { m: "list all added tags",
      res: 'all' },

    { m: "can I please get all tags that are turned on?",
      res: {
        enabled: true
        } },
    
    { m: "would you mind listing all the tags for me?",
      res: 'all' },


  // list -> tag -> [#, untagged, turn, (en | dis)able, no, without, don't, N, dig]

    { m: "list tags which are enabled",
      res: {
        enabled: true
        } },
    
    { m: "list tags that are not disabled",
      res: {
        enabled: true
        } },

    { m: "list tags that are turned on",
      res: {
        enabled: true
        } },
    
    { m: "list those tags which haven't been turned off",
      res: {
        enabled: true
        } },


   // list -> [(en|dis)able, turn, #, tag, untagged, no, N, dig]

    { m: "list disabled tags",
      res: {
        enabled: false
        } },
    
    { m: "list turned on tags",
      res: {
        enabled: true
        } },

    { m: "list not enabled tags",
      res: {
        enabled: false
        } },
    
    { m: "list not turned on tags",
      res: {
        enabled: false
        } },


    // [ forbidden ]

    { m: "add list all tags",                                          res: null },
    { m: "insert list of tags",                                        res: null },
    { m: "questions tagged listed",                                    res: null },
    { m: "list delete tags 3 ",                                        res: null },
    { m: "list deleted tag ",                                          res: null },
    { m: "show questioned tags ",                                      res: null },
    { m: "list tag question ",                                         res: null },
    { m: "list all not deleted tags ",                                 res: null },
    { m: "list turned off remove tags ",                               res: null },
    { m: "list turned off questions ",                                 res: null },
    { m: "would you mind listing disabled questions ",                 res: null },
    { m: "list enabled questions ",                                    res: null },
    { m: "list gnilist ",                                              res: null },
    { m: "list tag ",                                                  res: null },
    { m: "list all tags without anything ",                            res: null },
    { m: "don't list me the tags ",                                    res: null },
    { m: "never list me all the tags ",                                res: null },

];