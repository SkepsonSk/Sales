const database = require('./../database/database')
const dataInitializer = require('./../database/dataInitializer');

const loadDatabase = async () => {
    console.info('[DATABASE SYSTEM] Loading database...');

    database.configure('localhost', 'root', '', 'sales');

    try {
        await dataInitializer.initialize();
        console.info('[DATABASE SYSTEM] Loaded database.');
    } catch (error) {
        console.error('[DATABASE SYSTEM] Failed to load database.');
        console.error(error);
    }
}

exports.loadDatabase = loadDatabase;


