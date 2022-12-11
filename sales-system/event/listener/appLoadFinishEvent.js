const EventListener = require('./../eventListener');
module.exports = class AppLoadFinishEvent extends EventListener {

    async handle(app) {
        console.log('[EVENT SYSTEM] Test Message from event!');
        return Promise.resolve();
    }
}
