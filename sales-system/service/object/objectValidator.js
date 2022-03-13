const objectUtil = require('./objectUtil');

module.exports = class ObjectValidator {

    static validators = new Map();

    static registerValidator(validatorName, validator) {
        ObjectValidator.validators.set(validatorName, validator);
        console.log(`[VALIDATOR SYSTEM] Registered ${validatorName} validator.`);
    }

    constructor(layoutEditMetadata, objectData) {
        this.layoutEditMetadata = layoutEditMetadata;
        this.objectData = objectData;
    }

    process() {
        this.layoutEditMetadata.fields.forEach( fieldData =>
            this.processField(fieldData));
    }

    processField(fieldData) {
        console.log('Processing field: ' + fieldData.field);

        if (fieldData.validations != null) {
            fieldData.validations.forEach( validationData => {

                if (validationData.active == null || validationData.active) {
                    if (ObjectValidator.validators.has(validationData.type)) {
                        const fieldValue = this.objectData[fieldData.field];

                        if (ObjectValidator.validators.get(validationData.type).validate(validationData, fieldValue)) {
                            objectUtil.throwError(validationData.errorMessage);
                        }
                    }
                    else {
                        console.log(`[WARNING] Unknown validation type: ${validationData.type}`)
                    }
                }

            });
        }
    }

}
