const isString = require('../kuk.js').isString;
const isArray = require('../kuk.js').isArray;

class State {

    constructor(name, Commands){
        if (!isString(name)){ throw 'type error: {State}.name must be a string'; };
        if (!isArray(Commands)) { throw 'type error: {State}.Commands must be an array'; };
        this.name = name;
        this.Commands = Commands;
    }

}


module.exports = State;
