const exitCodes = {
    /**
     * no telegram bot api TOKEN provided
    */
    'noTOKEN': 1,

}

process.on('exit', function (code) {
    let o = '';
    switch(code){
        case exitCodes.noTOKEN:
            o =
`terminating node.js with exit code ${code}.
ERROR: no telegram bot api TOKEN provided. One must be provided in order to instantiate a bot`;
            break;
        default:
            break;
    }
    return console.log(o);
});

module.exports = exitCodes;
