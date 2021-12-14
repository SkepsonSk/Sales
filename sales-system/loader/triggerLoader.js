const metadata = require('../metadata/metadata');

const loadTriggers = async () => {
    console.info('[TRIGGER SYSTEM] Loading triggers...');

    const triggersData = await metadata.read('trigger/triggerDefinitions.json');

    triggersData.triggers.forEach( triggerData => {

        const triggerName = triggerData.name;
        const active = triggerData.active;

        if (active) {
            require(`./../trigger/${triggerName}`);
            console.info(`[TRIGGER SYSTEM] Loaded ${triggerName}.`);
        }

    } );

    return Promise.resolve();
}

exports.loadTriggers = loadTriggers;


