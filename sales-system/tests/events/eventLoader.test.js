const eventLoader = require('./../../loader/eventLoader');

describe('EventLoader tests', () => {

    it('Should perform events load', async () => {
        await expect(eventLoader.loadEvents()).resolves.not.toThrow();
    });

});
