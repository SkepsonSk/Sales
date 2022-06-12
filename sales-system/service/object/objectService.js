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

const retrieve = async (objectName, id, fields = null) => {
    const object = await metadata.read(`obj/${objectName}/object.json`);

    const objectQueryBuilder = new ObjectQueryBuilder(objectName, id);
    Object.keys(object.fields).forEach( fieldName => {
        if (fields == null || fields.includes(fieldName)) {
            const field = object.fields[fieldName];
            objectQueryBuilder[field.type](fieldName, field);
        }
    });

    const sql = objectQueryBuilder.toSQL();

    return new Promise( async (resolve, reject) => {

        try {
            const results = await database.transaction([{sql: sql}]);
            resolve(results[0][0][0]);
        } catch (e) {
            reject(e);
        }

    } );
}

const layout = async (objectName, id, layoutName = 'default', type = 'view') => {
    const layoutMetadata = await metadata.read(`layout/${objectName}/${layoutName}.json`);

    const fields = [];
    const layout = layoutMetadata[type];
    const layoutSections = Object.keys(layout);

    let layoutObject = {};

    layoutSections.forEach( section => {
        layoutObject[section] = {};

        layout[section].forEach( field => {
            fields.push(field);
        } );
    } );

    return retrieve(objectName, id, fields);
}

const create = async(objectName, data) => {
    objectName = objectName.toLowerCase();
    triggerEmitter.emit(`${objectName}BeforeInsert`, {new: data});

    return new Promise( async (resolve, reject) => {

        const id = data.id == null ?
            await idGenerationService.generateID(objectName) :
            data.id;

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
exports.layout = layout;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.retrieveObjectNames = retrieveObjectNames;
exports.triggerEmitter = triggerEmitter;
