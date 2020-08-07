const messages_test = require('./cmd_match_tree_test').messages_test;

const len = messages_test.length;
for (i=0; i < messages_test.length; i++){
    const elem = messages_test[i];

    if (elem.res){
        console.log('✓ '+elem.m);
    } else {
        console.log('✕ '+elem.m)
    }
}
