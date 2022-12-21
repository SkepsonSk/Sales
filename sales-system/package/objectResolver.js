const metadata = require('@metadata/metadata');

const objectPackageMap = new Map();

const registerObject = (objectName, packageName) => {
    objectPackageMap.set(objectName, packageName);
}

const resolve = (objectName) => {
    return objectPackageMap.get(objectName);
}

const resolveLayoutMetadata = async (objectName, layoutName) => {
    const packageName = resolve(objectName);
    if (packageName != null) {
        return await metadata.read(`layout/${objectName}/${layoutName}.json`, packageName);
    }
    else {
        return await metadata.read(`layout/${objectName}/${layoutName}.json`);
    }
}

const resolveObjectMetadata = async (objectName) => {
    const packageName = resolve(objectName);
    if (packageName != null) {
        return await metadata.read(`obj/${objectName}/object.json`, packageName);
    }
    else {
        return await metadata.read(`obj/${objectName}/object.json`);
    }
}

const resolveActionsMetadata = async (objectName) => {
    const packageName = resolve(objectName);
    if (packageName != null) {
        return await metadata.read(`obj/${objectName}/actions.json`, packageName);
    }
    else {
        return await metadata.read(`obj/${objectName}/actions.json`);
    }
}

exports.registerObject = registerObject;

exports.resolveObjectMetadata = resolveObjectMetadata;
exports.resolveLayoutMetadata = resolveLayoutMetadata;
exports.resolveActionsMetadata = resolveActionsMetadata;
