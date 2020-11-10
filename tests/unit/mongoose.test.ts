import { DBconnection } from "../../src/core/sheet/mongoose";

const ij = process.env.NODE_ENV === 'test';

const before = async () => {
    // console.log('executing beforeAll');
    return await DBconnection;
};

const after = async () => {
    // console.log('executing afterAll');
    const disconnect = await (await DBconnection).disconnect();
    return disconnect;
};


ij && beforeAll(before);

ij && afterAll(after);


ij ? (

    test('mongoose connection', done => {
        DBconnection.then((res) => {
            // console.log(res);
            expect(res).toBe(res);
            done();
        }).catch((e) => {
            // console.error(e);
        });
    })

) : (

    before() &&
    DBconnection.then((res) => {
        // console.log('#=#=#=#=# MONGOOSE #=#=#=#=#');
        // console.log(res);
    }).catch((e) => {
        // console.log('#=#=#=#=# ERROR #=#=#=#=#');
        // console.error(e);
    }) &&
    after()

);



