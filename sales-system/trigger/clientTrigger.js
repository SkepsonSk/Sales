const objectService = require('./../service/object/objectService');
const objectUtil = require('./../service/object/objectUtil');

objectService.triggerEmitter.on('clientBeforeInsert', objectData => {
    const firstName = objectUtil.capitalizeFirstLetter(objectData.new.firstName);
    const lastName = objectUtil.capitalizeFirstLetter(objectData.new.lastName);
    const company = objectData.new.company;

    objectData.new.name = `${firstName} ${lastName} ${company}`;
});
