const fs = require('fs');

const write = (metadataObject, path) => {
    const textObj = JSON.stringify(metadataObject);

    fs.writeFile(`${__dirname}/${path}`, textObj, 'utf8', err => {
        if (err) {
            console.log('[METADATA ERR] There was an error writing metadata file.');
            console.log(err);
        }
        else {
            console.log(`[METADATA OK] Metadata object has been saved to ${path}`);
        }
    });
}

const read = (path) => {
    return new Promise( (resolve, reject) => {
        fs.readFile(`${__dirname}/${path}`, 'utf8',(err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    } );
}

exports.write = write;
exports.read = read;
