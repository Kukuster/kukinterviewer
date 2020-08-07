import State from "../../core/State/State";




test('State properties', () => { 
    const statename = 'ready';
    const aState = new State('ready', []);
    expect(aState.name).toBe(statename);
});


