const metadata = require('./../../metadata/metadata');
const database = require('./../../database/database');

const SchemaBuilder = require('./../../database/schemaBuilder');

const defineObject = async (objectName, objectDefinition) => {
    const fields = objectDefinition.fields;

    const schema = new SchemaBuilder(objectName);

    fields.forEach( field => {
        schema[field.type](field.definition);
    });

    await database.runSQL(schema.constructSQL());

    return Promise.resolve();
}

const defineLayout = async(objectName, objectType, layoutDefinition) => {
    let layout = {};

    if (metadata.exists(`layout/${objectName}/${objectType}.json`)) {
        layout = await metadata.read(`layout/${objectName}/${objectType}.json`);
    }

    const viewFields = layoutDefinition.view?.fields;
    const editFields = layoutDefinition.edit?.fields;

    if (viewFields != null) {
        layout.view = { fields: viewFields };
    }

    if (editFields != null) {
        layout.view = { fields: editFields };
    }

    await metadata.write(layout, `layout/${objectName}/${objectType}.json`);

    return Promise.resolve();
}

const defineObjectMetadata = (objectName, objectMetadataDefinition) => {
    //TODO implement
}

exports.defineObject = defineObject;
exports.defineLayout = defineLayout;
exports.defineObjectMetadata = defineObjectMetadata;
