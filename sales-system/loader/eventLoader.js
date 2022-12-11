const metadata = require("../metadata/metadata");
const eventBus = require('../event/eventBus');

const loadEvents = async () => {
    const eventsMetadata = await metadata.read('events.json');
    const events = Object.keys(eventsMetadata);

    events.forEach( eventName => {
        const eventMetadata = eventsMetadata[eventName];
        const eventListenersNames = Object.keys(eventMetadata.eventListeners);

        eventListenersNames.forEach( eventListenerName => {
            const eventListenerMetadata = eventMetadata.eventListeners[eventListenerName];

            if (eventListenerMetadata.enabled) {
                console.log(`[EVENT SYSTEM] Loading Event Listener '${eventListenerName}'...`);
                const eventListener = new (require(`./../event/listener/${eventListenerName}`));
                eventBus.registerEventListener(eventName, eventListener);
            }
        } );
    });
}

exports.loadEvents = loadEvents;
