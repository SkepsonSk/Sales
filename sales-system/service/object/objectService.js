const EventEmitter = require('events');
const triggerEmitter = new EventEmitter();

const database = require('./../../database/database');
const idGenerationService = require('./idGenerationService');

const ObjectQueryBuilder = require('./objectQueryBuilder');
const ObjectValidator = require('./objectValidator');

const metadata = require('./../../metadata/metadata');

const list = (objectName) => {
    let sql = `SELECT * FROM ${objectName}`;

    return new Promise( (resolve, reject) => {
        database.runSQL(sql)
            .then( res => resolve(res) )
            .catch( err => reject(err) );
    } );
}

const retrieve = async (objectName, id) => {
    const layoutMetadataObj = await metadata.read(`layout/${objectName}/default.json`);
    const layoutMetadata = layoutMetadataObj.view;

    const objectQueryBuilder = new ObjectQueryBuilder(objectName, id);

    Object.keys(layoutMetadata.fields).forEach( fieldName => {
        const fieldData = layoutMetadata.fields[fieldName];
        objectQueryBuilder[fieldData.type](fieldName, fieldData);
    } );

    const sql = objectQueryBuilder.toSQL();

    return new Promise( (resolve, reject) => {
        database.runSQL(sql)
            .then( res => resolve(res[0]))
            .catch( err => {
                reject(err)
            } );
    } );
}

const retrieveForEdit = async (objectName, id) => {
    const layoutMetadataObj = await metadata.read(`layout/${objectName}/default.json`);
    const layoutMetadata = layoutMetadataObj.edit;

    let fields = [];
    for (const fieldData of layoutMetadata.fields) {
        fields.push(fieldData.field);
    }

    const sql = `SELECT ${fields.join(',')} FROM ${objectName} WHERE id='${id}'`;

    return new Promise( (resolve, reject) => {
        database.runSQL(sql)
            .then( res => resolve(res[0]))
            .catch( err => {
                reject(err)
            } );
    } );
}

const create = async(objectName, data) => {
    objectName = objectName.toLowerCase();
    triggerEmitter.emit(`${objectName}BeforeInsert`, {new: data});

    const layoutMetadataObj = await metadata.read(`layout/${objectName}/default.json`);
    const layoutMetadata = layoutMetadataObj.edit;

    const objectValidator = new ObjectValidator(layoutMetadata, data);
    objectValidator.process();

    return new Promise( (resolve, reject) => {
        idGenerationService.generateID(objectName)
            .then( id => {

                data.id = id;

                const keys = Object.keys(data);

                const values = Object.values(data);
                const fields = keys.join(',');

                let sql = `INSERT INTO ${objectName} (${fields}) VALUES (?)`;

                database.runSQLWithParams(sql, values)
                    .then( res => {
                        res.id = id;

                        triggerEmitter.emit(`${objectName}AfterInsert`, {new: data});

                        resolve(res);
                    } )
                    .catch( err => reject(err));

            } )
            .catch( err => reject(err) );
    } );
}

const update = async (objectName, id, data) => {
    const oldObject = await retrieve(objectName, id);
    objectName = objectName.toLowerCase();

    triggerEmitter.emit(`${objectName}BeforeUpdate`, { old: oldObject, new: data});

    let sql = `UPDATE ${objectName} SET ? WHERE id='${id}'`;
    return new Promise( (resolve, reject) => {

        database.runSQLWithParams(sql, data)
            .then( res => {
                triggerEmitter.emit(`${objectName}AfterUpdate`, { old: oldObject, new: data});
                resolve(res);
            } )
            .catch( err => {
                reject(err);
            });
    } );

}

const remove = async (objectName, id) => {
    const oldObject = await retrieve(objectName, id);

    objectName = objectName.toLowerCase();
    triggerEmitter.emit(`${objectName}BeforeRemove`, { old: oldObject});

    const sql = `DELETE FROM ${objectName} WHERE id='${id}'`

    return new Promise( (resolve, reject) => {

        database.runSQL(sql)
            .then( res => {
                console.log(`${objectName}AfterRemove`);
                triggerEmitter.emit(`${objectName}AfterRemove`, { old: oldObject});
                resolve(res);
            } )
            .catch( error => {
                reject(error);
            });

    } );
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
exports.retrieveForEdit = retrieveForEdit;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.retrieveObjectNames = retrieveObjectNames;
exports.triggerEmitter = triggerEmitter;
