const loggingService = require('@service/logging/loggingService');

describe('LoggingService tests', () => {

    it('Should perform eventSystem log', async () => {
        await loggingService.configure();
        const log = () => loggingService.log('eventSystem', 'TEST', 'info');
        expect(log).not.toThrow();
    });

});
