const database = require('./database');
const metadata = require('./../metadata/metadata');

const initialize = async () => {
    const objectMetadata = await metadata.read('objects.json');

    for (const objectName of Object.keys(objectMetadata.objects)) {

        try {
            await database.runSchema(`tables/${objectName}.sql`);
        } catch (err) {
            console.warn(`[DATABASE SYSTEM] Schema for ${objectName} failed to load (database may be down) - skipping.`)
        }
    }

    return Promise.resolve();
}

exports.initialize = initialize;
