import { nodeC } from "../../../Interpretation/matchTree/node";
import { nodeStep, walk } from "../../../Interpretation/matchTree/walk";


function check_walk(tree: nodeC, message: string){
    const Words = message.match(/\S+|\s+/g);
    if (!Words || !Array.isArray(Words)) {
        return null;
    }

    const path = [] as nodeStep[];
    walk(tree, Words, path);

    return path.length !== 0 ?
        path[path.length - 1].shoot :
        null;
}


function check_walk_log(tree: nodeC, message: string) {
    const Words = message.match(/\S+|\s+/g);
    if (!Words || !Array.isArray(Words)) {
        return null;
    }
    console.log(Words);
    const path = [] as nodeStep[];
    walk(tree, Words, path);

    return path.length !== 0 ?  
        path[path.length - 1].shoot :
        null;
}


export function test_walk(tree: nodeC, test_cases: any[]){
    const msg_lng = test_cases.length;
    for (var i = 0; i < msg_lng; i++) {
        if (process.env.NODE_ENV == 'test') {
            const msg = test_cases[i];
            const m = msg.m;
            const res = !!msg.res;
            const walkres = !!check_walk(tree, m);
            test('testing message #'+i+': "' + m + '": ', () => {
                expect(walkres).toBe(res);
            });

        } else {

            const msg = test_cases[i];
            const m = msg.m;
            const res = !!msg.res;
            var walkres = !!check_walk(tree, m);
            if (i < 5){
                walkres = !!check_walk_log(tree, m);
            }

            console.log();
            //console.log('message_test:', messages_test[i]);

            console.log('testing message #'+i+': "' + m + '": ');
            console.log(walkres===res);
        }

    }
}
//console.log(messages_test.length);

