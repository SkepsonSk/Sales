const eventBus = require('@event/eventBus');
const loggingLoader = require('@loader/loggingLoader');
const eventLoader = require('@loader/eventLoader');
const triggerService = require('@loader/triggerLoader');
const databaseLoader = require('@loader/databaseLoader');
const validatorsLoader = require('@loader/validatorsLoader');
const exporterLoader = require('@loader/exporterLoader');
const packageLoader = require('@loader/package/packageLoader');

const initializeApp = async (app) => {
    await loggingLoader.loadLogging();
    await eventLoader.loadEvents();
    await databaseLoader.loadDatabase();
    await triggerService.loadTriggers();
    await validatorsLoader.loadValidators();
    await exporterLoader.loadExporters();
    await packageLoader.loadPackages(app);

    await eventBus.callEvent('appLoadFinish', app);
    return Promise.resolve();
}

exports.initializeApp = initializeApp;
