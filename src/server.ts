import path from 'path';
import fs from 'fs';
import { PORT, HOST, APP_ENV } from './conf';
import express from 'express';
import bodyParser from 'body-parser';
import { botAdmin_app } from './web/botAdmin/app';
import { logf } from './reusable/console';



const server = express();

server.use(express.static('web/frontend'));


server.use(bodyParser.urlencoded({ extended: true }));

if (APP_ENV === 'dev'){
    server.use(botAdmin_app);
}

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





export default server.listen(PORT, HOST, () => {
    console.log(`server: Running at ${logf.u}${logf.fg.cyan}${HOST}:${PORT}${logf.end}`);
});


