import http from 'http';
import path from 'path';
import fs from 'fs';
import { PORT, HOST } from './conf';
import express from 'express';
import { inspect } from 'util';
import getChat from './core/sheet/methods/chat/getChat';


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

server.get('', (req, res) => {
    fs.readFile('./index.html', function(error, content){
        error ? 
            res.writeHead(500) &&
            res.end('HTTP 500')
        :
            res.writeHead(200, { 'Content-Type': 'text/html' }) &&
            res.end(content, 'utf-8');
    });
});

server.get('/api', (req, res) => {
    // console.log('---------------------------------------------');
    // console.log('on get /api/');
    // console.log({req, res});
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log('---------------------------------------------');

    res.json({msg: 'hello from express'});

});

// interface chatsQuery extends QueryString.ParsedQs {
//     chatId: number;
// };

server.get('/api/chats', (req, res) => {

    // res.json({req, res});
    // res.end(JSON.stringify({req, res}, null, 4));
    // res.end(safeStringify({req, res}));
    // res.end(inspect({req, res}) + '\n' + inspect({client: req.client}));


    // const basicReq = (
    //     ({app, baseUrl, body, cookies, fresh, hostname, ip, ips, method, originalUrl, params, path, protocol, query, route, secure, signedCookies, stale, subdomains, xhr}) =>
    //     ({app, baseUrl, body, cookies, fresh, hostname, ip, ips, method, originalUrl, params, path, protocol, query, route, secure, signedCookies, stale, subdomains, xhr})
    //  )(req);
    // res.end(inspect(basicReq));

    const query = req.query;

    console.log({query});

    // const chat = getChat(query.chatId)

    res.end()


});



export default server.listen(PORT, HOST, ()=>{
    console.log('server: Running at '+HOST+':'+PORT);
});


/*
export default http.createServer(function (request, response){

    console.log('server: request starting for ');
    console.log(request);

    var filePath = '.' + request.url;
    // if (filePath == './')
        filePath = './index.html'

    console.log(filePath);

    const extname = path.extname(filePath);
    let contentType: string;
    
    switch (extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        default:
            contentType = 'text/html';
    }

    fs.exists(filePath, function(exists){

        if (exists){
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                } else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        } 
        else {
            response.writeHead(404);
            response.end();
        }

    });

}).listen(PORT, HOST, () => {
    console.log('server: Running at '+HOST+':'+PORT);
});

/**
 * 
 */



