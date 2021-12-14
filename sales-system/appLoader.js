const triggerService = require('./loader/triggerLoader');
const databaseLoader = require('./loader/databaseLoader');

const initializeApp = async () => {
    await databaseLoader.loadDatabase();
    await triggerService.loadTriggers()

    return Promise.resolve();
}

exports.initializeApp = initializeApp;
