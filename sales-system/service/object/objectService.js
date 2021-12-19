const EventEmitter = require('events');
const triggerEmitter = new EventEmitter();

const database = require('./../../database/database');
const idGenerationService = require('./idGenerationService');

const ObjectQueryBuilder = require('./objectQueryBuilder');

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
    const objectsMetadata = await metadata.read(`objects.json`);
    const objectMetadata = objectsMetadata.objects[objectName];

    let fields = [`${objectName}.id`, `${objectName}.name`, `${objectName}.type`];
    let joins = [];

    const objectQueryBuilder = new ObjectQueryBuilder();

    Object.keys(objectMetadata.fields).forEach( fieldName => {
        const fieldData = objectMetadata.fields[fieldName];
        objectQueryBuilder[fieldData.type](fieldData);
    } );

    //TODO build a query builder class
    if (objectMetadata.fields != null) {
        Object.keys(objectMetadata.fields).forEach( field => {
            const joinObject = objectMetadata.fields[field];
            joins.push(`INNER JOIN ${joinObject.objectName} ON ${objectName}.${field} = ${joinObject.objectName}.id`);

            fields.push(field);
            for (let foreignField of joinObject.fields) {
                fields.push(`${joinObject.objectName}.${foreignField} AS ${joinObject.objectName}_${foreignField}`);
            }
        } );
    }

    let sql = `SELECT ${fields.join(',')} FROM ${objectName} ${joins.join(' ')} WHERE ${objectName}.Id='${id}'`;

    console.log(sql);

    return new Promise( (resolve, reject) => {
        database.runSQL(sql)
            .then( res => resolve(res[0]))
            .catch( err => {
                reject(err)
            } );
    } );
}

const create = (objectName, data) => {
    objectName = objectName.toLowerCase();

    triggerEmitter.emit(`${objectName}BeforeInsert`, {new: data});

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
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.retrieveObjectNames = retrieveObjectNames;
exports.triggerEmitter = triggerEmitter;
