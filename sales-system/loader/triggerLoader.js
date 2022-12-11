const metadata = require('@metadata/metadata');
const Trigger = require('@trigger/triggerCore/trigger');
const triggerService = require('@trigger/triggerCore/triggerService');

const loadTriggers = async () => {
    console.info('[TRIGGER SYSTEM] Loading triggers...');

    const triggersData = await metadata.read('trigger/triggerDefinitions.json');

    triggersData.triggers.forEach( triggerData => {
        const active = triggerData.active;
        if (active) {
            const triggerName = triggerData.name;
            const objectName = triggerData.objectName;

            const trigger = new (require(`./../trigger/${triggerName}`));
            triggerService.registerTrigger(objectName, trigger);
            console.info(`[TRIGGER SYSTEM] Loaded ${triggerName} for ${objectName}`);
        }

    } );

    return Promise.resolve();
}

exports.loadTriggers = loadTriggers;


