const metadata = require("./../../metadata/metadata");
const database = require('./../../database/database');

const retrieveRelations = (objectName) => {
    return new Promise( (resolve, reject) => {
        metadata.read('objects.json')
            .then( objects => {

                if (objects.objects[objectName].relations != null) {
                    resolve(Object.keys(objects.objects[objectName].relations));
                }
                else {
                    resolve([]);
                }


            })
            .catch( err => reject(err));
    } );
}

//TODO change to listRelationObjects
const retrieveRelationObjects = (objectName, relationName, objectId) => {
    return new Promise( (resolve, reject) => {

        metadata.read('objects.json')
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
