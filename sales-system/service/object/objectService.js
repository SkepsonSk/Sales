const EventEmitter = require('events');
const triggerEmitter = new EventEmitter();

const triggerService = require('./../../trigger/triggerCore/triggerService');

const database = require('./../../database/database');
const idGenerationService = require('./idGenerationService');

const ObjectQueryBuilder = require('./objectQueryBuilder');
const ObjectSearchBuilder = require('./objectSearchBuilder');
const ObjectValidator = require('./objectValidator');

const objectResolver = require('@package/objectResolver');
const packageService = require('@service/package/packageService');

const metadata = require('./../../metadata/metadata');

const retrieveMetadata = async (objectName) => {
    return await objectResolver.resolveObjectMetadata(objectName);
}

const retrieveActions = async (objectName) => {
    return await objectResolver.resolveActionsMetadata(objectName);
}

const list = (objectName, query = null) => {
    let sql = `SELECT * FROM ${objectName}`;
    if (query != null) {
        sql += ` WHERE ${query}`;
    }

    return new Promise( async (resolve, reject) => {
        try {
            const res = await database.transaction([{sql: sql}]);
            resolve(res[0][0]);
        } catch (e) {
            reject(e);
        }
    } );
}

const retrieve = async (objectName, id, fields = null) => {
    const object = await objectResolver.resolveObjectMetadata(objectName);

    const objectQueryBuilder = new ObjectQueryBuilder(objectName, id);
    Object.keys(object.fields).forEach( fieldName => {
        if (fields == null || fields.includes(fieldName) || fieldName === 'id') {
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

const search = async (search) => {
    const objectSearchBuilder = new ObjectSearchBuilder();
    await objectSearchBuilder.retrieveMetadata();
    return objectSearchBuilder.performSearch(search);
}

const layout = async (objectName, id, layoutName = 'default', type = 'view') => {
    const layoutMetadata = await objectResolver.resolveLayoutMetadata(objectName, layoutName);

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
    await triggerService.callBeforeInsert(objectName, data);

    return new Promise( async (resolve, reject) => {

        const id = data.id == null ?
            await idGenerationService.generateID(objectName) :
            data.id;

        data.id = id;
        const keys = Object.keys(data);
        const values = Object.values(data).map( v => `'${v}'` ).join(',');
        const fields = keys.join(',');

        let sql = `INSERT INTO ${objectName} (${fields}) VALUES (${values})`;

        try {
            let res = await database.transaction([{sql: sql}]);
            res[0][0].id = id;
            await triggerService.callAfterInsert(objectName, data);
            resolve(res[0][0]);
        } catch (e) {
            return reject(e);
        }


        /*database.runSQLWithParams(sql, values)
            .then( res => {
                res.id = id;

                triggerEmitter.emit(`${objectName}AfterInsert`, {new: data});

                resolve(res);
            } )
            .catch( err => reject(err));*/
    } );
}

const update = async (objectName, id, data) => {
    const oldObject = await retrieve(objectName, id);
    objectName = objectName.toLowerCase();

    await triggerService.callBeforeUpdate(objectName, data, oldObject);

    const updateSQL = Object.keys(data).map( field => `${field}='${data[field]}'` );
    let sql = `UPDATE ${objectName} SET ${updateSQL} WHERE id='${id}'`;

    try {
        let res = await database.transaction([{sql: sql}]);
        await triggerService.callAfterUpdate(objectName, data, oldObject);
        return Promise.resolve(res[0][0]);
    } catch (e) {
        return Promise.reject(e);
    }

    /*return new Promise( async (resolve, reject) => {

        database.runSQLWithParams(sql, data)
            .then( res => {
                triggerEmitter.emit(`${objectName}AfterUpdate`, { old: oldObject, new: data});
                resolve(res);
            } )
            .catch( err => {
                reject(err);
            });
    } );*/
}

const remove = async (objectName, id) => {
    const oldObject = await retrieve(objectName, id);

    objectName = objectName.toLowerCase();
    await triggerService.callBeforeRemove(objectName, oldObject);

    const sql = `DELETE FROM ${objectName} WHERE id='${id}'`
    try {
        let res = await database.transaction([{sql: sql}]);
        await triggerService.callAfterRemove(objectName, oldObject);
        return Promise.resolve(res[0][0]);
    } catch (e) {
        return Promise.reject(e);
    }

    /*return new Promise( (resolve, reject) => {

        database.runSQL(sql)
            .then( res => {
                triggerEmitter.emit(`${objectName}AfterRemove`, { old: oldObject});
                resolve(res);
            } )
            .catch( error => {
                reject(error);
            });

    } );*/
}

const retrieveObjectNames = async (objectName = null) => {
    const packageNameList = await packageService.getPackages();
    let objectNameList = [];

    for (const packageName of packageNameList) {
        const objectMetadata = await metadata.read('objects.json', packageName);
        const objectNames = Object.keys(objectMetadata.objects);

        objectNames.forEach( objectName => {
            objectNameList.push({
                objectName: objectName,
                objectDisplayName: objectMetadata.objects[objectName].displayName
            });
        } );
    }

    if (objectName != null) {
        objectNameList = objectNameList.filter( object => object.objectName.toLowerCase().includes(objectName.toLowerCase()));
    }

    return Promise.resolve(objectNameList);
}

exports.retrieveMetadata = retrieveMetadata;
exports.retrieveActions = retrieveActions;
exports.list = list;
exports.retrieve = retrieve;
exports.search = search;
exports.layout = layout;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.retrieveObjectNames = retrieveObjectNames;
exports.triggerEmitter = triggerEmitter;
