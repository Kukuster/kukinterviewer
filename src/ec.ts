/**
 * nodejs exit codes (if a FATAL ERROR occurs)
 */
const ec = {
    /**
     * no telegram bot api TOKEN provided
    */
    noTelegramBotApiTOKEN: 1,

} as const
type ec = typeof ec[keyof typeof ec];

process.on('exit', function (code) {
    let o = '';
    switch(code){
        case ec.noTelegramBotApiTOKEN:
            o =
`terminating node.js with exit code ${code}.
ERROR: no telegram bot api TOKEN provided. One must be provided in order to instantiate a bot`;
            break;
        default:
            break;
    }
    return console.log(o);
});


export default ec;
