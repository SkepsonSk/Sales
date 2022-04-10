const metadata = require('./../../metadata/metadata');

const retrieve = async (objectName, layoutName, layoutType) => {
    const layout = await metadata.read(`layout/${objectName}/${layoutName}.json`);
    const object = await metadata.read(`obj/${objectName}/object.json`);

    const fields = [];
    layout[layoutType].fields.forEach( fieldName => {
        const field = object.fields[fieldName];
        field.field = fieldName;

        fields.push(field);
    } );

    return fields;
}

exports.retrieve = retrieve;
