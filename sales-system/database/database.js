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

const runSchema = (sqlFile) => {
    return new Promise( (resolve, reject) => {
        const fileName = `${__dirname}/schema/${sqlFile}`

        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }

            runSQL(data)
                .then( res => {
                    console.log(`[DATABASE SYSTEM] Loaded schema ${sqlFile}`);
                    resolve(res);
                }  )
                .catch( err => reject(err) );
        });
    } );
}

const runSQL = (sql) => {
    return new Promise( (resolve, reject) => {
        this.pool.getConnection( (err, conn) => {

            if (!err) {
                conn.query(sql, (err, res) => {
                    conn.release();

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
    } );
}

const runSQLWithParams = (sql, params) => {
    return new Promise( (resolve, reject) => {
        this.pool.getConnection( (err, conn) => {

            if (!err) {
                conn.query(sql, [params], (err, res) => {
                    conn.release();

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
    } );
}

const describeObject = (objectName) => {
    return new Promise( (resolve, reject) => {
        const sql = `DESCRIBE ${objectName}`

        this.pool.getConnection( (err, conn) => {
            if (!err) {

                conn.query(sql, (err, res) => {
                    conn.release();

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
exports.runSQLWithParams = runSQLWithParams;
exports.runSchema = runSchema;
exports.describeObject = describeObject;
