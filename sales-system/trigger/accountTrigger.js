const objectService = require('./../service/object/objectService');
const objectUtil = require('./../service/object/objectUtil');

objectService.triggerEmitter.on('accountBeforeInsert', objectData => {
    objectData.new.name = objectData.new.name.toUpperCase();
});

objectService.triggerEmitter.on('accountAfterInsert', objectData => {
   console.log(objectData.new);
   objectUtil.throwError('Illegal data...');
});

objectService.triggerEmitter.on('accountBeforeUpdate', objectData => {
    objectData.new.name = 'Tescik';
});

objectService.triggerEmitter.on('accountAfterUpdate', objectData => {
    console.log(objectData);
});

objectService.triggerEmitter.on('accountBeforeRemove', objectData => {
    objectUtil.throwError('Error');
});
