const loggingService = require('@service/logging/loggingService');

const loadLogging = async () => {
    console.info('[LOGGING SYSTEM] Loading logging...');
    loggingService.configure();
    return Promise.resolve();
}

exports.loadLogging = loadLogging;
