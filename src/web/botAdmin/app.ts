import bodyParser from "body-parser";
import fs from 'fs';
import express from "express";
import parseDuration from "parse-duration";
import prettyMilliseconds from "pretty-ms";
import { inspect } from "util";
import { sendMessageSafely } from "../../bot";
import { IISendMessageOptions } from "../../botlib";
import getAllChats from "../../core/sheet/methods/chat/getAllChats";
import getChat from "../../core/sheet/methods/chat/getChat";
import parseTimezone from "../../Interpretation/textProcessing/parseTimezone";
import { convertFromTZ, convertTZ, getDateWithoutTime, getTimeDifference, getTimeWithoutDate } from "../../reusable/datetime";
import datejs from 'date.js';





function safeStringify<T> (obj: T, indent = 2) {
    let cache: any[] | null = [];
    const retVal = JSON.stringify(
        obj,
        (key, value) => typeof value === "object" && value !== null
            ? cache && cache.includes(value)
                ? undefined // Duplicate reference found, discard key
                : cache && cache.push(value) && value // Store value in our collection
            : value,
        indent
    );
    cache = null;
    return retVal;
}




export const botAdmin_app = express();

botAdmin_app.use(express.static('web/frontend'));


botAdmin_app.use(bodyParser.urlencoded({ extended: true }));


botAdmin_app.get('/api', (req, res) => {
    console.log("server.get('/api')");

    res.json({msg: 'hello from express'});
    res.end();

});

botAdmin_app.get('/api/chats', async (req, res) => {
    console.log("server.get('/api/chats')");

    const query = req.query;

    console.log({query});
    if (query.chatId && typeof query.chatId === 'string'){
        const chat =  await getChat(parseInt(query.chatId));
        res.end(inspect(chat));
    } else {
        const chats = await getAllChats({"chatId": true, "Questions": true, "Tags": true});
        // res.end(inspect(chats));
        res.end(inspect(chats?.map(c => { return {chatId: c.chatId, chat: c}; }), undefined, 4));
    }


});


botAdmin_app.get('/botDebug', (req, res) => {
    console.log("server.get('/botDebug')");

    const botDebug = '/../frontend/dist/html/botDebug.html';
    const botDebug_full = __dirname + botDebug;
    fs.readFile(botDebug_full, (error, content) => {
        if (error) {
            res.writeHead(500) &&
                res.end('HTTP 500');
            console.log('error reading file "' + botDebug_full + '": ', { error });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' }) &&
                res.end(content, 'utf-8');
            console.log('successfully server contents of a requested file ' + botDebug_full + '');
        }
    });
    console.log('server.ts: ', { __dirname });

});

botAdmin_app.post('/bot-sendMessage', (req, res) => { 

    const reqBody = req.body as {
        chatId?: string,
        message?: string,
        parse_mode?: IISendMessageOptions["parse_mode"],
        password?: string,
        emojify?: boolean
    };
    const tempPassword = '12321';

    if (reqBody.password !== tempPassword) { 
        console.log('tried to request bot.sendMessage with wrong password:', { reqBody });
        res.sendStatus(403);
        return;
    }
    const chatId = reqBody.chatId ? parseInt(reqBody.chatId) : 0;
    if (!chatId) { 
        console.log('tried to request bot.sendMessage without chatId:', { chatId });
        res.sendStatus(404);
        return;
    }
    const message = reqBody.message;
    const parseMode = reqBody.parse_mode ? reqBody.parse_mode : undefined;

    if (!chatId || !message) {
        console.log('Got POST request body: ', req.body);
        res.sendStatus(400);
        return;
    }

    console.log('');
    console.log('');
    console.log({ message_length: message.length });

    
    // const currDate = setAskingTime_testBaseDate;
    const currDate = new Date();
    const currDate_datetime_unix = currDate.getTime();
    const currDate_date_unix     = getDateWithoutTime(currDate.getTime());
    const currDate_time_unix     = getTimeWithoutDate(currDate.getTime());
    
    const clientTimezone = 'Europe/Kiev';
    const clientCurrDate = convertTZ(currDate, clientTimezone);
    const clientCurrDate_datetime_unix = clientCurrDate.getTime();
    const clientCurrDate_date_unix     = getDateWithoutTime(clientCurrDate.getTime());
    const clientCurrDate_time_unix     = getTimeWithoutDate(clientCurrDate.getTime());


    const parsed_duration  = parseDuration(message);
    const formulated_duration  = parsed_duration  ? prettyMilliseconds(parsed_duration,  { verbose: true }) : null;

    // NO for human-interval. Choosing parse-duration.

    const parsed_datetime = datejs(message, currDate);
    // const parsed_datetime = new Date(datejs(message, currDate).toUTCString());
    const parsed_datetime_unix = parsed_datetime.getTime();
    const parsed_date_unix = getDateWithoutTime(parsed_datetime_unix);
    const parsed_time_unix = getTimeWithoutDate(parsed_datetime_unix);

    const TZparsed_datetime = convertFromTZ(datejs(message, currDate), clientTimezone);
    // const TZparsed_datetime = new Date(datejs(message, currDate).toUTCString());
    const TZparsed_datetime_unix = TZparsed_datetime.getTime();
    const TZparsed_date_unix = getDateWithoutTime(TZparsed_datetime_unix);
    const TZparsed_time_unix = getTimeWithoutDate(TZparsed_datetime_unix);


    const formulated_datetime = parsed_datetime.toDateString() + ' '  + parsed_datetime.toTimeString();
    // const parsed_datetime_diff = parsed_datetime.getTime() - currDate.getTime();
    const parsed_datetime_diff = getTimeDifference(parsed_datetime, currDate, 'seconds'); console.log({ parsed_datetime_diff});
    const formulated_datetime_diff = prettyMilliseconds(parsed_datetime_diff, { verbose: true });
    const injected_datetime = `
parse-duration: ${parsed_duration}
formulated-duration: ${formulated_duration}

now:            ${currDate}
unix datetime:  ${currDate_datetime_unix}
unix date:      ${currDate_date_unix}
unix time:      ${currDate_time_unix}

now_toLocaleStr:${currDate.toLocaleString("en-US", { timeZone: clientTimezone })}
now_convertTZ:  ${clientCurrDate}
unix datetime:  ${clientCurrDate_datetime_unix}
unix date:      ${clientCurrDate_date_unix}
unix time:      ${clientCurrDate_time_unix}

date.js:        ${parsed_datetime}
unix datetime:  ${parsed_datetime_unix}
unix date:      ${parsed_date_unix}
unix time:      ${parsed_time_unix}

date.js_TZ:     ${TZparsed_datetime}
unix datetime:  ${TZparsed_datetime_unix}
unix date:      ${TZparsed_date_unix}
unix time:      ${TZparsed_time_unix}

`;
// This time later: ${formulated_datetime_diff}`;

    const parsed_timezone = parseTimezone(message);
    // console.log('\n\n\n\n\n\n\n\n');
    // console.log(getAllCountries());
    // console.log('\n\n\n\n');
    // console.log(getAllTimezones());
    // console.log('\n\n\n\n\n\n\n\n');

    // console.log({parsed_timezone});

    // sendMessageSafely(chatId, message +'\n'+ JSON.stringify(parsed_timezone, null, 2), {
    // sendMessageSafely(chatId, message +'\n'+ monospace(injected_datetime), {
    // sendMessageSafely(chatId, message +'\n'+ monospace(JSON.stringify(getAllCountries(),null,2)), {
    sendMessageSafely(chatId, message, {
        parse_mode: parseMode,
        emojify: reqBody.emojify,
        // processBeforeSend: monospace,
        // processRightBeforeSend_Markdown: monospace,
    });

    // console.log('Got POST request body: ', req.body);
    res.sendStatus(200);

});


