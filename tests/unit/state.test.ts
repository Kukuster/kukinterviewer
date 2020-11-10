import State from "../../src/core/State/State";




test('State: proper construction with its properties', () => {
    const statename = 'ready';
    const aState = new State('ready', []);
    expect(aState.name).toBe(statename);
});


