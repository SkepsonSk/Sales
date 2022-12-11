const metadata = require('@metadata/metadata');

let LOGGING_UNITS_METADATA;
let LOGGING_LEVELS_METADATA;

const configure = async () => {
    LOGGING_UNITS_METADATA = await metadata.read('logging/loggingUnits.json');
    LOGGING_LEVELS_METADATA = await metadata.read('logging/loggingLevels.json');
}

const log = (unit, message, level) => {
    const loggingUnit = LOGGING_UNITS_METADATA[unit];
    const loggingLevel = LOGGING_LEVELS_METADATA[level];

    if (loggingUnit.console) {
        if (loggingLevel.console) {
            console[level](`[${loggingUnit.displayName}] ${message}`);
        }
    }
}

exports.configure = configure;
exports.log = log;
