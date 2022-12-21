const metadata = require('@metadata/metadata');

const packageDatabaseLoader = require('@loader/package/packageDatabaseLoader');
const packageTriggerLoader = require('@loader/package/packageTriggerLoader');
const packageApiLoader = require('@loader/package/packageApiLoader');

const loadPackages = async (app) => {
    console.info('[PACKAGE SYSTEM] Loading packages...');
    const packageMetadata = await metadata.read('packages.json');
    const packages = Object.keys(packageMetadata);

    for (const packageName of packages) {
        const packageData = packageMetadata[packageName];
        console.log(`[PACKAGE SYSTEM] Loading package ${packageName}...`);

        await packageDatabaseLoader.initializeDatabase(packageName, packageData);
        await packageTriggerLoader.loadTriggers(packageName, packageData);
        await packageApiLoader.loadAPI(packageName, packageData, app);

        const packageEntry = new (require(`@package/${packageName}/${packageData.entry}`));
        packageEntry.init();
    }

    return Promise.resolve();
}

exports.loadPackages = loadPackages;
