import { DBconnection } from "../../src/core/sheet/mongoose";

const before = async () => {
    return await DBconnection;
};

const after = async () => {
    const disconnect = await (await DBconnection).disconnect();
    return disconnect;
};


beforeAll(before);

afterAll(after);


test('mongoose connection', done => {
    DBconnection.then((res) => {
        expect(res).toBe(res);
        done();
    });
});


