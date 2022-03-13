const triggerService = require('./loader/triggerLoader');
const databaseLoader = require('./loader/databaseLoader');
const validatorsLoader = require('./loader/validatorsLoader');

const initializeApp = async () => {
    await databaseLoader.loadDatabase();
    await triggerService.loadTriggers();
    await validatorsLoader.loadValidators();

    return Promise.resolve();
}

exports.initializeApp = initializeApp;
