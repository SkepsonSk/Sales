const eventListeners = new Map();

const registerEventListener = (eventName, eventListener) => {
    if (!eventListeners.has(eventName)) {
        eventListeners.set(eventName, []);
    }
    eventListeners.get(eventName).push(eventListener);
}

const callEvent = async (eventName, args) => {
    if (eventListeners.has(eventName)) {
        for (const eventListener of eventListeners.get(eventName)) {
            await eventListener.handle(args);
        }
    }
    else {
        throw new Error(`There is no event named ${eventName}`);
    }

}

exports.registerEventListener = registerEventListener;
exports.callEvent = callEvent;
