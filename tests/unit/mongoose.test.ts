import mongoose from "../../core/sheet/mongoose";
// const mong = mongoose.default;

const ij = process.env.NODE_ENV === 'test'

const before = async () => {
    // console.log('executing beforeAll');
    return await mongoose.dbPromise;
};

const after = async () => {
    // console.log('executing afterAll');
    const disconnect = await (await mongoose.dbPromise).disconnect();
    return disconnect;
};


ij && beforeAll(before)

ij && afterAll(after)


ij ? (

    test('mongoose.connect_result', done => {
        mongoose.dbPromise.then((res) => {
            // console.log(res);
            expect(res).toBe(res);
            done();
        }).catch((e) => {
            // console.error(e);
        })
    })

) : (

    before() &&
    mongoose.dbPromise.then((res) => {
        // console.log('#=#=#=#=# MONGOOSE #=#=#=#=#');
        // console.log(res);
    }).catch((e) => {
        // console.log('#=#=#=#=# ERROR #=#=#=#=#');
        // console.error(e);
    }) &&
    after()

)



