'use strict';

import { addQuestion_execute_args } from "./execute";

export type addQuestion_testCase = 
    { m: string,                                                                           res: addQuestion_execute_args | null };
export const addQuestion_testCases: addQuestion_testCase[] = [

    // add -> question -> \n -> *text*
    { m: "add question \nwhat programming languages do you know?   ",                      res: { 
        action: "add question",
        questionText: "what programming languages do you know?",
     } },
    { m: "add new question \ndo you know php?",                                            res: { 
        action: "add question",
        questionText: "do you know php?",
     } },
    { m: "new question \ndo you know python?",                                             res: { 
        action: "add question",
        questionText: "do you know python?"
     } },
    { m: "create question \ndo you know javascript? ",                                     res: { 
        action: "add question",
        questionText: "do you know javascript?"
     } },

     // add -> question -> \n -> "* -> *text* -> *"
    { m: "create new question \n\"do you know typescript?\" ",                             res: { 
        action: "add question",
        questionText: "do you know typescript?"
     } },

     // add -> question: -> "* -> *text* -> *"
    { m: "add a question: <<do you know python?>>  ",                                      res: { 
        action: "add question",
        questionText: "do you know python?"
     } },
    { m: "add a question: «do you know python?»  ",                                        res: { 
        action: "add question",
        questionText: "do you know python?"
     } },
    { m: "add a question: \"do you know python?\"  ",                                      res: { 
        action: "add question",
        questionText: "do you know python?"
     } },
    { m: "add a question: 'do you know python?'  ",                                        res: { 
        action: "add question",
        questionText: "do you know python?"
     } },
    { m: "add a question. 'do you know python?'  ",                                        res: { 
        action: "add question",
        questionText: "do you know python?"
     } },
    { m: "add a question. '#python do you know python?'  ",                                res: { 
        action: "add question",
        questionText: "#python do you know python?",
        Tags: ['python']
     } },
    { m: "create question: \"do you know C++?\" ",                                         res: { 
        action: "add question",
        questionText: "do you know C++?"
     } },
    { m: "create a question: \"do you know C?\" ",                                         res: { 
        action: "add question",
        questionText: "do you know C?"
     } },
    { m: "create question: <<#go #languages do you know Go?>> ",                           res: { 
        action: "add question",
        questionText: "#go #languages do you know Go?",
        Tags: ['go', 'languages']
     } },
    { m: "could you please add a question: «do you know C#?» ",                            res: { 
        action: "add question",
        questionText: "do you know C#?"
     } },
    { m: "Can you add the following question, please: «do you know .NET?» ",               res: { 
        action: "add question",
        questionText: "do you know .NET?"
     } },
    { m: "Can you add the following question, please: «#dotNET\n do you know .NET?» ",     res: { 
        action: "add question",
        questionText: "do you know .NET?",
        Tags: ['dotnet']
     } },
    // { m: "Can you add the following question, please: «#dotNET\n do you know .NET?» ",     res: { 
    //     action: "add question",
    //     questionText: "do you know .NET?",
    //     Tags: ['dotNET']
    //  } },
    { m: "add new question\n<<#php #python\n #htmlcss       \n\n \n>>   ",                 res: {
        // this one will pass `.match` mathod, but will fail produce a proper request and output an error
        action: "add question",
        questionText: "",
        Tags: ['php', 'python', 'htmlcss']
     } },

     // question -> add -> \n -> «* -> *text* -> *»
    { m: "Here's question I want you to add:\n«do you know data structures?» ",            res: { 
        action: "add question",
        questionText: "do you know data structures?"
     } },
    

    // add -> question -> tag -> # -> "* -> *text* -> *"
    { m: "add question with tag #web \"what do you know about web?\"",                     res: { 
        action: "add question",
        questionText: "what do you know about web?",
        Tags: ['web'],
     } },

    { m: "add a question tagged #web #frontend \"what #css frameworks do you know?\"",     res: { 
        action: "add question",
        questionText: "what #css frameworks do you know?",
        Tags: ['web', 'frontend', 'css'],
     } },

     
    // no questionText provided
    { m: "add new question ",                                                              res: {
        action: 'ask to provide a questionText',
        questionText: null,
     } },

    { m: "write down a new question",                                                      res: {
        action: 'ask to provide a questionText',
        questionText: null,
     } },
     
    { m: "add new #web question ",                                                         res: {
        action: 'ask to provide a questionText',
        questionText: null,
        Tags: ['web'],
     } },

    // { m: "add new question with tag #web",                                                         res: {
    //     action: 'ask to provide a questionText',
    //     questionText: null,
    //     Tags: ['web'],
    //  } },
     
    // too long questionText provided
    { m: "add new question << Ipsum eu eu et dolore laboris elit elit nostrud aliqua incididunt magna. Occaecat voluptate labore nulla voluptate qui amet sit ut incididunt tempor. Pariatur in reprehenderit duis esse fugiat laboris do incididunt tempor ea sunt. Occaecat ut reprehenderit commodo ea voluptate. Labore nostrud consequat ullamco nulla nisi eu labore cupidatat deserunt. Exercitation adipisicing cillum do et. Quis et anim sunt ut exercitation magna amet aliqua labore mollit enim deserunt. Ad cillum anim ullamco incididunt exercitation culpa nisi sunt exercitation dolor deserunt velit cillum. Irure veniam consequat deserunt dolor laboris et incididunt velit irure enim. Incididunt exercitation sint eu esse aute veniam in tempor veniam amet culpa qui. Mollit commodo ea quis enim dolore velit nulla incididunt consequat do laborum cupidatat ullamco. Veniam mollit eiusmod veniam veniam quis commodo enim culpa consectetur. Magna enim magna aliquip ullamco qui deserunt cillum irure. Lorem deserunt culpa esse nisi anim commodo. Nisi incididunt nulla et minim ut commodo magna elit. Anim ullamco aute officia magna ad. Fugiat anim tempor ullamco in. Officia est mollit voluptate aliquip est ut excepteur laboris irure incididunt cupidatat fugiat. Laborum est non non nostrud amet ad pariatur mollit aute. Non Lorem duis aliquip anim laboris anim ad ut sint voluptate. Reprehenderit irure commodo duis veniam cupidatat in. Esse in occaecat labore qui anim ullamco nostrud cillum fugiat. Est elit cillum eu consectetur fugiat ex do occaecat fugiat do incididunt. Qui excepteur nulla in aute sunt quis esse anim laboris fugiat adipisicing ut excepteur. Ea nulla elit eiusmod pariatur nostrud aliqua labore adipisicing. Elit nulla in ipsum ut quis eiusmod minim voluptate est anim. Duis et non Lorem Lorem ea eiusmod dolore pariatur consequat qui elit qui Lorem. Do nisi ex minim consectetur pariatur labore fugiat tempor ipsum. Aliquip amet excepteur sint aliquip ex mollit proident consectetur aliquip anim est. Dolor anim tempor esse veniam minim ex cupidatat quis dolor. Pariatur veniam aliquip veniam dolor eu. Proident est pariatur ad eiusmod id commodo aliquip reprehenderit. Exercitation dolore commodo est duis consectetur. Sunt tempor officia est laboris excepteur sunt ex excepteur. Incididunt sunt in nisi aliqua occaecat amet incididunt. In anim deserunt veniam in est. Consequat sit ex aliqua ipsum amet. Est do aliqua id adipisicing ex veniam qui velit. Id velit reprehenderit proident reprehenderit quis occaecat. Laboris labore nostrud eiusmod id consequat aliqua dolore sit est pariatur qui ipsum aute officia. Ullamco labore mollit cupidatat veniam dolore dolore proident quis fugiat nulla. Officia non labore proident consequat magna ad culpa duis ex eiusmod nostrud proident. Qui velit consequat ex eiusmod culpa sit ad proident irure laboris dolor exercitation enim eu. Occaecat non anim consectetur incididunt. Id duis veniam ex do dolore sint qui aliquip amet. Irure pariatur cupidatat tempor in Lorem aute laboris exercitation. Aliquip nisi reprehenderit quis aute ut aliqua. Eu et quis deserunt aliquip officia mollit enim amet ad id incididunt veniam. Laboris enim aliqua cupidatat mollit eu veniam aute nostrud consectetur fugiat aliquip. Aliquip et est id velit. Tempor ex ullamco labore nulla cupidatat dolore reprehenderit occaecat cillum ad velit minim est nostrud. Cillum anim exercitation ullamco ullamco culpa ullamco Lorem minim dolore eiusmod nulla. Duis eu excepteur laborum amet Lorem aute ipsum cillum. Excepteur laborum nisi est aliquip ea aute irure velit cupidatat consequat sit. Eiusmod aliquip reprehenderit reprehenderit magna mollit incididunt culpa consequat eiusmod culpa officia id laborum. Culpa occaecat aliqua ex excepteur amet aliquip nisi sunt non aliqua aute officia. Et do laborum et nisi ad aute minim tempor commodo id laborum. Magna dolore eu excepteur qui commodo esse. Mollit excepteur cillum minim qui occaecat nulla laboris et id. >>",
     res: {
        action: 'ask to provide smaller questionText',
        questionText: null,
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
    { m: "question ",                                                                      res: null },

    // [ neg ]
    { m: "don't add me a question: \"do you use negations in queries to the bot?\" ",      res: null },
    { m: "never add a question: \"do you know anything?\" ",                               res: null },


];

