const loggingLoader = require('@loader/loggingLoader');

describe('LoggingLoader tests', () => {

    it('Should load LoggingService', async () => {
        await expect(loggingLoader.loadLogging()).resolves;
    });

});
