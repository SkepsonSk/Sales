const database = require('@database/database');
const metadata = require('@metadata/metadata');

const initialize = async () => {
    const objectMetadata = await metadata.read('objects.json');

    for (const objectName of Object.keys(objectMetadata.objects)) {

        try {
            await database.runSchema(`tables/${objectName}.sql`);
        } catch (err) {
            console.warn(`[DATABASE SYSTEM] Schema for ${objectName} failed to load (probably missing file). Skipping.`)
        }
    }

    return Promise.resolve();
}

exports.initialize = initialize;
