const metadata = require('./../../metadata/metadata');
const database = require('./../../database/database');

const SchemaBuilder = require('./../../database/schemaBuilder');
const ObjectMetadataBuilder = require('./../../database/objectBuilder');

const defineObject = async (objectName, objectDefinition) => {
    const fields = objectDefinition.fields;

    const schema = new SchemaBuilder(objectName);

    fields.forEach( field => {
        schema[field.type](field.definition);
    });

    await database.runSQL(schema.constructSQL());

    return Promise.resolve();
}

const defineLayout = async(objectName, layoutDefinition) => {

}

exports.defineObject = defineObject;
