const Validator = require('./validator');

module.exports = class RegexValidator extends Validator {

    validate(validationData, fieldValue) {
        const regexObj = new RegExp(validationData.regex);
        return !regexObj.test(fieldValue);
    }
}
