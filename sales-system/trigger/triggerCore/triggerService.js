let registeredTriggers = new Map();

const canRun = (objectName) => {
    return registeredTriggers.has(objectName);
}

const registerTrigger = (objectName, trigger) => {
    registeredTriggers.set(objectName, trigger);
}

const callBeforeInsert = async (objectName, newObject) => {
    if (canRun(objectName)) {
        await registeredTriggers.get(objectName).beforeInsert(newObject);
    }
}

const callAfterInsert = async (objectName, newObject) => {
    if (canRun(objectName)) {
        await registeredTriggers.get(objectName).afterInsert(newObject);
    }
}

const callBeforeUpdate = async (objectName, newObject, oldObject) => {
    if (canRun(objectName)) {
        await registeredTriggers.get(objectName).beforeUpdate(newObject, oldObject);
    }
}

const callAfterUpdate = async (objectName, newObject, oldObject) => {
    if (canRun(objectName)) {
        await registeredTriggers.get(objectName).afterUpdate(newObject, oldObject);
    }
}

const callBeforeRemove = async (objectName, newObject) => {
    if (canRun(objectName)) {
        await registeredTriggers.get(objectName).beforeRemove(newObject);
    }
}

const callAfterRemove = async (objectName, newObject) => {
    if (canRun(objectName)) {
        await registeredTriggers.get(objectName).afterRemove(newObject);
    }
}

exports.registerTrigger = registerTrigger;
exports.canRun = canRun;
exports.callBeforeInsert = callBeforeInsert;
exports.callAfterInsert = callAfterInsert;
exports.callBeforeUpdate = callBeforeUpdate;
exports.callAfterUpdate = callAfterUpdate;
exports.callBeforeRemove = callBeforeRemove;
exports.callAfterRemove = callAfterRemove;
