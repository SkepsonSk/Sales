const metadata = require('./../../metadata/metadata');

const retrieve = async (objectName, layoutName, layoutType) => {
    const layout = await metadata.read(`layout/${objectName}/${layoutName}.json`);
    const object = await metadata.read(`obj/${objectName}/object.json`);

    let objectLayout = {};

    const sections = Object.keys(layout[layoutType]);
    sections.forEach( section => {
        objectLayout[section] = [];

        layout[layoutType][section].forEach( fieldName => {
            const field = object.fields[fieldName];
            field.field = fieldName;

            objectLayout[section].push(field);
        } );
    } );

    return objectLayout;
}

exports.retrieve = retrieve;
