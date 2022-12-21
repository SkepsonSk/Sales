const database = require('./../../database/database');
const packageService = require('@service/package/packageService');

const retrieveRelations = async (objectName) => {
    const objectMetadata = await packageService.getObjectsMetadata();
    if (objectMetadata.objects[objectName].relations != null) {
        return Promise.resolve(objectMetadata.objects[objectName].relations);
    }
    else {
        return Promise.resolve([]);
    }
}

//TODO change to listRelationObjects
const retrieveRelationObjects = (objectName, relationName, objectId) => {
    return new Promise( (resolve, reject) => {

        packageService.getObjectsMetadata('objects.json')
            .then( objects => {

                if (objects.objects[objectName].relations != null) {
                    const relation = objects.objects[objectName].relations[relationName];

                    const title = relation.title;
                    const fields = relation.fields.join(',');
                    const relatedObject = relation.objectName;
                    const targetField = relation.field;

                    const sql = `SELECT Id,${fields} FROM ${relatedObject} WHERE ${targetField}='${objectId}'`;
                    database.runSQL(sql)
                        .then( results => {

                            resolve({
                                title: title,
                                objectName: relatedObject,
                                relatedField: targetField,
                                fields: relation.fields,
                                results: results
                            });

                        } )
                        .catch( err => reject(err) );

                }
                else {
                    reject({message: 'No such relation.'});
                }

            })
            .catch( err => reject(err));

    } );
}

exports.retrieveRelations = retrieveRelations;
exports.retrieveRelationObjects = retrieveRelationObjects;
