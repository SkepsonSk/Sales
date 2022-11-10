const triggerService = require('./loader/triggerLoader');
const databaseLoader = require('./loader/databaseLoader');
const validatorsLoader = require('./loader/validatorsLoader');
const exporterLoader = require('./loader/exporterLoader');

const initializeApp = async () => {
    await databaseLoader.loadDatabase();
    await triggerService.loadTriggers();
    await validatorsLoader.loadValidators();
    await exporterLoader.loadExporters();

    return Promise.resolve();
}

exports.initializeApp = initializeApp;
