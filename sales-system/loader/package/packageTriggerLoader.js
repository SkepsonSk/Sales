const metadata = require('@metadata/metadata');
const triggerService = require('@trigger/triggerCore/triggerService');

const loadTriggers = async (packageName, packageMetadata) => {
    console.info(`[${packageName}] [TRIGGER SYSTEM] Loading triggers...`);

    const triggersMetadata = await metadata.read('triggers.json', packageName);
    triggersMetadata.triggers.forEach( triggerData => {
        const active = triggerData.active;
        if (active) {
            const triggerName = triggerData.name;
            const objectName = triggerData.objectName;

            const trigger = new (require(`@package/${packageName}/trigger/${triggerName}`));
            triggerService.registerTrigger(objectName, trigger);
            console.info(`[${packageName}] [TRIGGER SYSTEM] Loaded ${triggerName} for ${objectName}`);
        }

    } );

    return Promise.resolve();
}

exports.loadTriggers = loadTriggers;
