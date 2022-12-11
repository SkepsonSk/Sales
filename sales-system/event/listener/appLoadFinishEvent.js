const EventListener = require('@event/eventListener');
const loggingService = require('@service/logging/loggingService');

module.exports = class AppLoadFinishEvent extends EventListener {

    async handle(app) {
        loggingService.log('eventSystem', 'Test Message from event!', 'info');
        return Promise.resolve();
    }
}
