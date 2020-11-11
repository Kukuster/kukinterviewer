'use strict';

export type addQuestion_testCase = 
    { m: string,                                                                        res: { questionText?: NonNullable<string>, Tags?: string[] } | null };
export const addQuestion_testCases: addQuestion_testCase[] = [

    // add -> question -> \n -> *text*
    { m: "add question \nwhat programming languages do you know?   ",                      res: { 
        questionText: "what programming languages do you know?"
     } },
    { m: "add new question \ndo you know php?",                                         res: { 
        questionText: "do you know php?",
     } },
    { m: "new question \ndo you know python?",                                            res: { 
        questionText: "do you know python?"
     } },
    { m: "create question \ndo you know javascript? ",                                     res: { 
        questionText: "do you know javascript?"
     } },

     // add -> question -> \n -> "* -> *text* -> *"
    { m: "create new question \n\"do you know typescript?\" ",                               res: { 
        questionText: "do you know typescript?"
     } },

     // add -> question: -> "* -> *text* -> *"
    { m: "add a question: <<do you know python?>>  ",                                      res: { 
        questionText: "do you know python?"
     } },
    { m: "add a question: «do you know python?»  ",                                        res: { 
        questionText: "do you know python?"
     } },
    { m: "add a question: \"do you know python?\"  ",                                      res: { 
        questionText: "do you know python?"
     } },
    { m: "add a question: 'do you know python?'  ",                                        res: { 
        questionText: "do you know python?"
     } },
    { m: "add a question. 'do you know python?'  ",                                        res: { 
        questionText: "do you know python?"
     } },
    { m: "add a question. '#python do you know python?'  ",                                res: { 
        questionText: "#python do you know python?",
        Tags: ['python']
     } },
    { m: "create question: \"do you know C++?\" ",                                         res: { 
        questionText: "do you know C++?"
     } },
    { m: "create a question: \"do you know C?\" ",                                         res: { 
        questionText: "do you know C?"
     } },
    { m: "create question: <<#go #languages do you know Go?>> ",                           res: { 
        questionText: "#go #languages do you know Go?",
        Tags: ['go', 'languages']
     } },
    { m: "could you please add a question: «do you know C#?» ",                            res: { 
        questionText: "do you know C#?"
     } },
    { m: "Can you add the following question, please: «do you know .NET?» ",               res: { 
        questionText: "do you know .NET?"
     } },
    { m: "Can you add the following question, please: «#dotNET\n do you know .NET?» ",     res: { 
        questionText: "do you know .NET?",
        Tags: ['dotNET']
     } },
    { m: "add new question\n<<#php #python\n #htmlcss       \n\n \n>>   ",                 res: {
        // this one will pass `.match` mathod, but will fail produce a proper request and output an error
        questionText: "",
        Tags: ['php', 'python', 'htmlcss']
     } },

     // question -> add -> \n -> «* -> *text* -> *»
    { m: "Here's question I want you to add:\n«do you know data structures?» ",            res: { 
        questionText: "do you know data structures?"
     } },
    

    // add -> question -> tag -> # -> "* -> *text* -> *"
    { m: "add question with tag #web \"what do you know about web?\"",                     res: { 
        questionText: "what do you know about web?",
        Tags: ['web'],
     } },

    { m: "add a question tagged #web #frontend \"what #css frameworks do you know?\"",     res: { 
        questionText: "what #css frameworks do you know?",
        Tags: ['web', 'frontend', 'css'],
     } },

     
     // [ wrong_path ]
    { m: "add new question\n<<       \n\n \n>>   ",                                        res: null },

    // [ forbidden ]
    { m: "erase question: <<do you know HTML/CSS?>>  ",                                    res: null },
    { m: "remove new question: <<do you know HTML/CSS?>> ",                                res: null },
    { m: "turn new question on: <<do you know anything?>> ",                               res: null },
    { m: "delete new question \"do you know anything?\"  ",                                res: null },
    { m: "add delete question \"do you know anything?\"  ",                                res: null },

    { m: "add turn question: <<do you know anything?>> ",                                  res: null },
    { m: "new question delete \"do you know anything?\"  ",                                res: null },

    { m: "add new questions 'do you know anything?'  ",                                    res: null },
    { m: "add 2 questions \n<<do you know HTML?>>\n<<do you know CSS?>>> ",                res: null },
    { m: "add new 2 questions \n<<do you know HTML?>>\n<<do you know CSS?>> ",             res: null },

    // [ ... -> ✕ ]
    { m: "add new question << ",                                                           res: null },
    { m: "add question \" ",                                                               res: null },
    { m: "add new question: \n ",                                                          res: null },
    { m: "add new question ",                                                              res: null },
    { m: "question ",                                                                      res: null },

    // [ neg ]
    { m: "don't add me a question: \"do you use negations in queries to the bot?\" ",      res: null },
    { m: "never add a question: \"do you know anything?\" ",                               res: null },


];

