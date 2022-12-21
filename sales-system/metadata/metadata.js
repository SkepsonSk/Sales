const fs = require('fs');
const dirname = require('path').dirname;

const write = (metadataObject, path) => {
    const textObj = JSON.stringify(metadataObject);

    if (!exists(`${__dirname}/${path}`)) {
        const dir = dirname(`${__dirname}/${path}`);
        console.log(dir);
        fs.mkdirSync(dir, {recursive: true});
    }

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

const read = (path, packageName = null) => {
    let absolutePath;
    if (packageName == null) {
        absolutePath = `${__dirname}/${path}`;
    }
    else {
        absolutePath = `${__dirname}/../package/${packageName}/metadata/${path}`;
    }

    return new Promise( (resolve, reject) => {
        fs.readFile(absolutePath, 'utf8',(err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    } );
}

const exists = (path) => {
    return fs.existsSync(`${__dirname}/${path}`);
}

exports.write = write;
exports.read = read;
exports.exists = exists;
