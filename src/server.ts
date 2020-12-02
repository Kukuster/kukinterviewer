import http from 'http';
import path from 'path';
import fs from 'fs';
import { PORT, HOST } from './conf';
import express from 'express';
import { inspect } from 'util';
import getChat from './core/sheet/methods/chat/getChat';
import getAllChats from './core/sheet/methods/chat/getAllChats';


console.log('hello from server.js');

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

const server = express();

server.use(express.static('web/frontend'));


server.get('', (req, res) => {
    console.log("server.get('')");

    const home = '/web/frontend/dist/html/home.html';
    const home_full = __dirname + home;
    fs.readFile(home_full, (error, content) => {
        if (error) {
            res.writeHead(500) &&
                res.end('HTTP 500');
            console.log('error reading file "' + home_full + '": ', { error });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' }) &&
                res.end(content, 'utf-8');
            console.log('successfully server contents of a requested file ' + home_full + '');
        }
    });
    // res.redirect('/app');

    console.log('server.ts: ',{__dirname});
});


server.get('/app', (req, res) => {
    console.log("server.get('/app')");

    const frontendApp = '/web/frontend/dist/html/app.html';
    const frontendApp_full = __dirname + frontendApp;
    fs.readFile(frontendApp_full, (error, content) => {
        if (error) {
            res.writeHead(500) &&
            res.end('HTTP 500');
            console.log('error reading file "'+frontendApp_full+'": ', { error });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' }) &&
            res.end(content, 'utf-8');
            console.log('successfully server contents of a requested file '+frontendApp_full+'');
        }
    });
    console.log('server.ts: ',{__dirname});
});



server.get('/api', (req, res) => {
    console.log("server.get('/api')");

    res.json({msg: 'hello from express'});
    res.end();

});

server.get('/api/chats', async (req, res) => {
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

server.get(/.(css|js|jpg|jpeg|png|svg)$/, (req, res) => {
    console.log('server.get(/.(css|js|jpg|jpeg|png|svg)$/');
    
    console.log({ __dirname, req_url: req.url});
    // const filePath = __dirname + '/web/frontend/' + req.url;
    const filePath = __dirname + '/web/frontend/dist/' + req.url;
    res.sendFile(path.resolve(filePath), (error) => {

        if (error){
            console.error({ error });
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(JSON.stringify({ error }));
        } 
    });
});


export default server.listen(PORT, HOST, ()=>{
    console.log('server: Running at '+HOST+':'+PORT);
});


