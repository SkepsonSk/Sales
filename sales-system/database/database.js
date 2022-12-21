const fs = require('fs');
const mysql = require('mysql');
const mysql2 = require('mysql2/promise');

const setDataSource = (dataSource) => {
    this.dataSource = dataSource;
}

const configure = (host, user, password, database, port = 3306) => {
    this.pool = mysql.createPool({
        connectionLimit: 10,
        host: host,
        user: user,
        password: password,
        database: database,
        port: port
    });

    this.pool2 = mysql2.createPool({
        connectionLimit: 10,
        host: host,
        user: user,
        password: password,
        database: database,
        port: port
    });

    this.dataSource = this.pool2;
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

const transaction = ( queries ) => {
    return new Promise( async(resolve, reject) => {

        try {
            const conn = await this.dataSource.getConnection();

            await conn.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
            await conn.beginTransaction();

            const results = [];
            for (const query of queries) {
                const res = await conn.execute(query.sql, query.items);
                results.push(res);
            }

            await conn.commit();
            await conn.release();
            resolve(results);
        } catch (e) {
            reject(e);
        }
    } );
}

exports.setDataSource = setDataSource;
exports.configure = configure;
exports.runSQL = runSQL;
exports.runSQLWithParams = runSQLWithParams;
exports.runSchema = runSchema;
exports.describeObject = describeObject;
exports.transaction = transaction;
