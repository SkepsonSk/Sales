const ObjectValidator = require('@service/object/objectValidator');
const RegexValidator = require('@service/object/validators/regexValidator');

const loadValidators = async () => {
    console.info('[TRIGGER SYSTEM] Loading validators...');

    ObjectValidator.registerValidator('regex', new RegexValidator());

    return Promise.resolve();
}

exports.loadValidators = loadValidators;


