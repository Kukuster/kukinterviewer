import http from 'http';
import path from 'path';
import fs from 'fs';
import { PORT, HOST } from './conf';


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
})
