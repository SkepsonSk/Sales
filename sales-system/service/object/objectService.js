const database = require('./../../database/database');
const idGenerationService = require('./idGenerationService');

const metadata = require('./../../metadata/metadata');

const list = (objectName) => {
    let sql = `SELECT * FROM ${objectName}`;

    return new Promise( (resolve, reject) => {
        database.runSQL(sql)
            .then( res => resolve(res) )
            .catch( err => reject(err) );
    } );
}

const retrieve = (objectName, id) => {
    let sql = `SELECT * FROM ${objectName} WHERE Id='${id}'`;

    return new Promise( (resolve, reject) => {
        database.runSQL(sql)
            .then( res =>  resolve(res[0]))
            .catch( err => reject(err) );
    } );
}

const create = (objectName, data) => {
    objectName = objectName.toLowerCase();

    return new Promise( (resolve, reject) => {
        idGenerationService.generateID(objectName)
            .then( id => {

                data.id = id;

                const keys = Object.keys(data);

                const values = Object.values(data);
                const fields = keys.join(',');

                let sql = `INSERT INTO ${objectName} (${fields}) VALUES (?)`;

                database.runSQLWithParams(sql, values)
                    .then( res => resolve(res) )
                    .catch( err => reject(err));

            } )
            .catch( err => reject(err) );
    } );
}

const update = (objectName, id, data) => {
    objectName = objectName.toLowerCase();

    let sql = `UPDATE ${objectName} SET ? WHERE id='${id}'`;
    return database.runSQLWithParams(sql, data);
}

const remove = (objectName, id) => {
    objectName = objectName.toLowerCase();

    const sql = `DELETE FROM ${objectName} WHERE id='${id}'`
    return database.runSQL(sql);
}

const retrieveObjectNames = () => {
    return new Promise( (resolve, reject) => {
        metadata.read('objects.json')
            .then( objects =>
                resolve(Object.keys(objects.objects))
             )
            .catch( err => reject({ok: false, err: err}));
    } );
}

exports.list = list;
exports.retrieve = retrieve;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.retrieveObjectNames = retrieveObjectNames;
