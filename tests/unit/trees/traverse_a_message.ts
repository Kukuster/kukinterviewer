import { nodeC } from "../../../Interpretation/matchTree/node";
import { nodeStep, walk } from "../../../Interpretation/matchTree/walk";
import { IIMessage, Command_match, Command_prepare } from "../../../core/Command/Command";


const mock_telegram_message = (text: string): IIMessage => ({
    text: text,
    message_id: 222222222,
    date: 333333333,
    chat: {
        id: 444444444,
        type: 'private'
    }
})


async function walk_match_prepare<PrepArgs,ExecArgs>(tree: nodeC, msg: IIMessage, matchfunc: Command_match<PrepArgs>, prepfunc: Command_prepare<PrepArgs,ExecArgs>)  {
    const path = await matchfunc(msg);
   return path ? await prepfunc (msg, path) : null;
}


export async function testWalk<PrepArgs,ExecArgs>(tree: nodeC, test_cases: any[], matchfunc: Command_match<PrepArgs>, prepfunc: Command_prepare<PrepArgs,ExecArgs>){

    return Promise.all(test_cases.map((testCase)=>{
        const m = testCase.m;
        return walk_match_prepare(tree, mock_telegram_message(m), matchfunc, prepfunc);
    }))

}

