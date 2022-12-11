const eventBus = require('./../../event/eventBus');
const EventListener = require('./../../event/eventListener');

describe('EventBus tests', () => {

    it('Should register EventListener instance and call an Event', async () => {
        const eventListener = new EventListener();

        eventBus.registerEventListener('testEvent', eventListener);

        await expect(eventBus.callEvent('testEvent', null)).resolves.not.toThrow();
    });

    it('Should call not existing event and throw Error', async () => {
        await expect(eventBus.callEvent('testEventNonExisting', null)).rejects.toThrow(Error);
    });

});
