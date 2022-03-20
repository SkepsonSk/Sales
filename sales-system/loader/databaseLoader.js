const database = require('./../database/database')
const dataInitializer = require('./../database/dataInitializer');

const loadDatabase = async () => {
    console.info('[DATABASE SYSTEM] Loading database...');

    const host = process.env.DB_HOST || 'localhost';
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || 'root';
    const db = process.env.DB_DATABASE || 'sales';

    database.configure(host, user, password, db);

    try {
        await dataInitializer.initialize();
        console.info('[DATABASE SYSTEM] Loaded database.');
    } catch (error) {
        console.error('[DATABASE SYSTEM] Failed to load database.');
        console.error(error);
    }
}

exports.loadDatabase = loadDatabase;
