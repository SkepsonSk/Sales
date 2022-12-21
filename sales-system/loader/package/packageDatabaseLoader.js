const database = require('@database/database');
const metadata = require('@metadata/metadata');
const objectResolver = require('@package/objectResolver');

const initializeDatabase = async (packageName, packageMetadata) => {
    const objectMetadata = await metadata.read('objects.json', packageName);

    for (const objectName of Object.keys(objectMetadata.objects)) {

        try {
            await database.runSchema(`./../../package/${packageName}/database/${objectName}.sql`);
            objectResolver.registerObject(objectName, packageName);
            console.log(`[${packageName}] [DATABASE SYSTEM] Loaded schema for ${objectName}`);
        } catch (err) {
            console.warn(`[${packageName}] [DATABASE SYSTEM] Schema for ${objectName} failed to load (probably missing file). Skipping.`)
        }
    }

    return Promise.resolve();
}

exports.initializeDatabase = initializeDatabase;
