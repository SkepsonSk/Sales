module.exports = class Trigger {

    async beforeInsert (newObject){
        return Promise.resolve();
    }
    async afterInsert (newObject){
        return Promise.resolve();
    }

    async beforeUpdate (newObject, oldObject){
        return Promise.resolve();
    }

    async afterUpdate (newObject, oldObject){
        return Promise.resolve();
    }

    async beforeRemove (oldObject){
        return Promise.resolve();
    }

    async afterRemove (oldObject){
        return Promise.resolve();
    }
}
