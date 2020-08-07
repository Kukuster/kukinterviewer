export type turnTagsOnOff_testCase = 
    { m: string,                                                res: { Tags: string[] | 'all', status: 'on' | 'off' } | null };
export const turnTagsOnOff_testCases: turnTagsOnOff_testCase[] = [


    // turn -> # -> on/off
    { m: "turn #tag1 tag on ",                                                             res: { 
        Tags: ['tag1'],
        status: 'on'
     } },
    { m: "turn tags #tag1 #tag2 #web off ",                                                res: { 
        Tags: ['tag1','tag2','web'],
        status: 'off'
     } },
    { m: "would you mind turning #web off? ",                                              res: { 
        Tags: ['web'],
        status: 'off'
     } },
    { m: "hey, maybe turn #web off? ",                                                     res: {  
        Tags: ['web'],
        status: 'off'
    } },
    { m: "can I please have tags #web #css turned off? ",                                  res: { 
        Tags: ['web','css'],
        status: 'off'
     } },
    { m: "turn #web off! ",                                                                res: { 
        Tags: ['web'],
        status: 'off'
     } },


    // turn -> on/off -> #
    { m: "turn off #tag tag ",                                                             res: { 
        Tags: ['tag'],
        status: 'off'
     } },
    { m: "turn off #tag1 #tag2 #tag3 tags ",                                               res: { 
        Tags: ['tag1','tag2','tag2','tag3'],
        status: 'off'
     } },


    // enable/disable -> #
    { m: "enable tag #tag1 ",                                                              res: { 
        Tags: ['tag1'],
        status: 'on'
     } },
    { m: "disable #web ",                                                                  res: { 
        Tags: ['web'],
        status: 'off'
     } },
    { m: "enable #tag1 #tag2 ",                                                            res: { 
        Tags: ['tag1','tag2'],
        status: 'on'
     } },
    { m: "how about disabling #web tag? ",                                                 res: { 
        Tags: ['web'],
        status: 'off'
     } },
    { m: "don't mind enabling #web ?! ",                                                   res: { 
        Tags: ['web'],
        status: 'on'
     } },


    // turn -> on/off -> all -> tags
    { m: "turn on all the tags ",                                                          res: { 
        Tags: 'all',
        status: 'on'
     } },


    // turn -> all -> tags -> on/off
    { m: "turn all the tags off ",                                                         res: { 
        Tags: 'all',
        status: 'off'
     } },


    // enable/disable -> all -> tags
    { m: "enable all tags ",                                                               res: { 
        Tags: 'all',
        status: 'on'
     } },
     


    // [ ... -> ✕ ]
    { m: "how about you turn yourself off, fucking bot. ",                                 res: null },
    { m: "turn on the tag ",                                                               res: null },
    { m: "turnage all the tags ",                                                          res: null },
    { m: "turn #tag1 #tag2 #web tags ",                                                    res: null },
    { m: "tags #tag1 #tag2 turn off ",                                                     res: null },
    { m: "enable tags ",                                                                   res: null },
    { m: "turn tags ",                                                                     res: null },
    { m: "turn all ",                                                                      res: null },

    // [ neg ]
    { m: "don't enable #tag1 ",                                                            res: null },
    { m: "turn all not #tag3 tags ",                                                       res: null },

    // [ forbidden ]
    { m: "turn off #tag1 #tag2 #tag3 questions tags ",                                     res: null },
    { m: "disable on tags #tag1 #tag2 ",                                                   res: null },
    { m: "turn off and on all the tags ",                                                  res: null },
    { m: "turn all the questions with #tag1 #tag2 #web off ",                              res: null },
    { m: "turning all the questions on ",                                                  res: null },
    { m: "turn off all tagged #tag1 ",                                                     res: null },
    { m: "disable everything tagged #tag2 ",                                               res: null },




];