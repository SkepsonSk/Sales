const fs = require('fs');
const mysql = require('mysql');

const configure = (host, user, password, database) => {
    this.pool = mysql.createPool({
        connectionLimit: 10,
        host: host,
        user: user,
        password: password,
        database: database
    });
}

const runSQL = (sqlFile) => {
    return new Promise( (resolve, reject) => {
        const fileName = `${__dirname}/schema/${sqlFile}`

        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }

            this.pool.getConnection( (err, conn) => {

                if (!err) {
                    conn.query(data, (err, res) => {
                        if (!err) {
                            resolve(res);
                        }
                        else {
                            reject(err);
                        }
                    })

                }
                else {
                    reject(err);
                }
            } );
        });
    } );
}

const describeObject = (objectName) => {
    return new Promise( (resolve, reject) => {
        const sql = `DESCRIBE ${objectName}`

        this.pool.getConnection( (err, conn) => {
            if (!err) {

                conn.query(sql, (err, res) => {

                    if (!err) {
                        resolve(res);
                    }
                    else {
                        reject(err);
                    }

                });

            }
            else {
                reject(err);
            }
        });
    } );
}

exports.configure = configure;
exports.runSQL = runSQL;
exports.describeObject = describeObject;
