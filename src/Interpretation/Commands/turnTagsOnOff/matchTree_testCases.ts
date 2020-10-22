export type turnTagsOnOff_testCase = 
    { m: string,                                                res: { Tags: string[] | 'all', turn: 'on' | 'off' } | null };
export const turnTagsOnOff_testCases: turnTagsOnOff_testCase[] = [


    // turn -> # -> on/off
    { m: "turn #tag1 tag on ",                                                             res: { 
        Tags: ['tag1'],
        turn: 'on'
     } },
    { m: "turn tags #tag1 #tag2 #web off ",                                                res: { 
        Tags: ['tag1','tag2','web'],
        turn: 'off'
     } },
    { m: "would you mind turning #web off? ",                                              res: { 
        Tags: ['web'],
        turn: 'off'
     } },
    //{ m: "hey, maybe turn #web off? ",                                                     res: {  
    { m: "maybe turn #web off? ",                                                          res: {    
        Tags: ['web'],
        turn: 'off'
     } },
    { m: "turn #web off! ",                                                                res: { 
        Tags: ['web'],
        turn: 'off'
     } },


    // turn -> on/off -> #
    { m: "turn off #tag tag ",                                                             res: { 
        Tags: ['tag'],
        turn: 'off'
     } },
    { m: "turn off #tag1 #tag2 #tag3 tags ",                                               res: { 
        Tags: ['tag1','tag2','tag3'],
        turn: 'off'
     } },

    
    // # -> turn -> on/off
    { m: "can I please have tags #web #css turned off? ",                                  res: { 
        Tags: ['web','css'],
        turn: 'off'
     } },


    // enable/disable -> #
    { m: "enable tag #tag1 ",                                                              res: { 
        Tags: ['tag1'],
        turn: 'on'
     } },
    { m: "disable #web ",                                                                  res: { 
        Tags: ['web'],
        turn: 'off'
     } },
    { m: "enable #tag1 #tag2 ",                                                            res: { 
        Tags: ['tag1','tag2'],
        turn: 'on'
     } },
    { m: "how about disabling #web tag? ",                                                 res: { 
        Tags: ['web'],
        turn: 'off'
     } },
    { m: "don't mind enabling #web ?! ",                                                   res: { 
        Tags: ['web'],
        turn: 'on'
     } },


    // turn -> on/off -> all -> tags
    { m: "turn on all the tags ",                                                          res: { 
        Tags: 'all',
        turn: 'on'
     } },


    // turn -> all -> tags -> on/off
    { m: "turn all the tags off ",                                                         res: { 
        Tags: 'all',
        turn: 'off'
     } },


    // enable/disable -> all -> tags
    { m: "enable all tags ",                                                               res: { 
        Tags: 'all',
        turn: 'on'
     } },
     


    // [ ... -> ✕ ]
    { m: "how about you turn yourself off, fucking bot. ",                                 res: null },
    { m: "turn on the tag ",                                                               res: null },
    { m: "turnage all the tags ",                                                          res: null },
    { m: "turn #tag1 #tag2 #web tags ",                                                    res: null },
    //{ m: "tags #tag1 #tag2 turn off ",                                                     res: null },
    { m: "enable tags ",                                                                   res: null },
    { m: "turn tags ",                                                                     res: null },
    { m: "turn all ",                                                                      res: null },

    // [ neg ]
    { m: "don't enable #tag1 ",                                                            res: null },
    { m: "turn all not #tag3 tags ",                                                       res: null },

    // [ forbidden ]
    { m: "turn off #tag1 #tag2 #tag3 questions tags ",                                     res: null },
    //{ m: "disable on tags #tag1 #tag2 ",                                                   res: null },
    { m: "turn off and on all the tags ",                                                  res: null },
    { m: "turn all the questions with #tag1 #tag2 #web off ",                              res: null },
    { m: "turning all the questions on ",                                                  res: null },
    { m: "turn off all tagged #tag1 ",                                                     res: null },
    { m: "disable everything tagged #tag2 ",                                               res: null },




];