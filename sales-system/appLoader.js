const triggerService = require('./loader/triggerLoader');
const databaseLoader = require('./loader/databaseLoader');
const validatorsLoader = require('./loader/validatorsLoader');
const exporterLoader = require('./loader/exporterLoader');
const apiLoader = require('./loader/api/apiLoader');

const initializeApp = async (app) => {
    await databaseLoader.loadDatabase();
    await triggerService.loadTriggers();
    await validatorsLoader.loadValidators();
    await exporterLoader.loadExporters();
    await apiLoader.loadAPI(app);

    return Promise.resolve();
}

exports.initializeApp = initializeApp;
