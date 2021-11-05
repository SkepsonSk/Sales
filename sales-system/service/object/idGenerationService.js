const {
    v1: uuidv1,
    v4: uuidv4
} = require('uuid');

const metadata = require('./../../metadata/metadata');

const generateID = (objectName) => {
    return new Promise( (resolve, reject) => {
        metadata.read('objectCodes.json')
            .then( objectCodes => {
                const code = objectCodes.objectCodes[objectName].toString().padStart(3, '0');
                resolve(`${code}-${uuidv4()}`)
            }  )
            .catch( err => reject(err) );
    } );
}

exports.generateID = generateID;
