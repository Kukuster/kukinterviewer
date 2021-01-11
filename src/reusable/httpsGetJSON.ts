import https from 'https';


export default function httpsGetJSON(url: string, log?: boolean){

    const consolelog   = (...args: unknown[]) => log && console.log(...args);
    const consoleerror = (...args: unknown[]) => log && console.error(...args);


    return new Promise<{status?: number, parsedData: unknown}>((resolve, reject) => {
        https.get(url, function (res) {
            const { contentType } = res.headers;

            if (
                (typeof contentType === 'string' && !/^application\/json/.test(contentType) ) ||
                (Array.isArray(contentType) && !contentType.some(cT => /^application\/json/.test(cT)))
            ){
                const error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
                consoleerror(error);
                reject(error);
            }

            consolelog('STATUS: ' + res.statusCode);
            consolelog('HEADERS: ' + JSON.stringify(res.headers));

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const result = {
                        status: res.statusCode,
                        parsedData: JSON.parse(rawData),
                    };
                    consolelog(result);
                    resolve(result);
                } catch (e) {
                    consoleerror(e);
                    reject(e);
                }
            });
        }).on('error', (e) => {
            consoleerror(e);
            reject(e);
        });
    });

}

