const database = require('./../../database/database');
const idGenerationService = require('./idGenerationService');

const mysql = require('mysql');

const retrieve = (objectName, filters) => {
    let sql = `SELECT * FROM ${objectName}`;

    if (filters) {
        sql += ` WHERE ${filters}`
    }

    return new Promise( (resolve, reject) => {
        database.runSQL(sql)
            .then( res => resolve(res) )
            .catch( err => reject(err) );
    } )
}

const create = (objectName, data) => {
    data.id = idGenerationService.generateID(objectName);

    const keys = Object.keys(data);

    const values = Object.values(data);
    const fields = keys.join(',');

    let sql = `INSERT INTO ${objectName} (${fields}) VALUES (?)`;

    return database.runSQLWithParams(sql, values);
}

const update = (objectName, id, data) => {
    const keys = Object.keys(data);

    let sql = `UPDATE ${objectName} SET ? WHERE id='${id}'`;

    return database.runSQLWithParams(sql, data);
}

const remove = (objectName, id) => {
    const sql = `DELETE FROM ${objectName} WHERE id='${id}'`
    return database.runSQL(sql);
}

exports.retrieve = retrieve;
exports.create = create;
exports.update = update;
exports.remove = remove;
