const eventBus = require('@event/eventBus');
const loggingLoader = require('@loader/loggingLoader');
const eventLoader = require('@loader/eventLoader');
const triggerService = require('@loader/triggerLoader');
const databaseLoader = require('@loader/databaseLoader');
const validatorsLoader = require('@loader/validatorsLoader');
const exporterLoader = require('@loader/exporterLoader');
const apiLoader = require('@loader/api/apiLoader');

const initializeApp = async (app) => {
    await loggingLoader.loadLogging();
    await eventLoader.loadEvents();
    await databaseLoader.loadDatabase();
    await triggerService.loadTriggers();
    await validatorsLoader.loadValidators();
    await exporterLoader.loadExporters();
    await apiLoader.loadAPI(app);

    await eventBus.callEvent('appLoadFinish', app);
    return Promise.resolve();
}

exports.initializeApp = initializeApp;
