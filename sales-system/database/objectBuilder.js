module.exports = class ObjectMetadataBuilder {

    constructor(objectMetadata, objectName) {
        this.objectMetadata = objectMetadata;
        this.objectName = objectName;

        this.objectMetadata.objects[objectName] = { code: objectMetadata.nextAvailableCode };
        this.objectMetadata.nextAvailableCode = this.objectMetadata.nextAvailableCode+1;
    }

    relation(relationDefinition) {
        if (this.objectMetadata.objects[relationDefinition.relationObject] == null) {
            this.objectMetadata.objects[relationDefinition.relationObject] = { relations: {}};
        }

        if (this.objectMetadata.objects[relationDefinition.relationObject].relations == null) {
            this.objectMetadata.objects[relationDefinition.relationObject].relations = {};
        }

        this.objectMetadata.objects[relationDefinition.relationObject].relations[relationDefinition.relationName] = {
            objectName: this.objectName,
            title: relationDefinition.relationTitle,
            field: relationDefinition.fieldName,
            fields: relationDefinition.displayFields
        };
    }

    getObjectDefinition() {
        return this.objectMetadata;
    }

}
