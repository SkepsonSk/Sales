const metadata = require('@metadata/metadata');

const getPackages = async () => {
    const packageMetadata = await metadata.read('packages.json');
    return Object.keys(packageMetadata);
}

const getObjectsMetadata = async () => {
    const packagesMetadata = await metadata.read('packages.json');
    let objects = { objects: {} };
    for (const packageName of Object.keys(packagesMetadata)){
        if (packagesMetadata[packageName].enabled) {
            const objectsMetadata = await metadata.read('objects.json', packageName);
            Object.keys(objectsMetadata.objects).forEach( objectName => objects.objects[objectName] = objectsMetadata.objects[objectName]);
        }
    }
    return Promise.resolve(objects);
}

exports.getPackages = getPackages;
exports.getObjectsMetadata = getObjectsMetadata;
