const objectResolver = require('@package/objectResolver');

const retrieve = async (objectName, layoutName, layoutType) => {
    const layout = await objectResolver.resolveLayoutMetadata(objectName, layoutName);
    const object = await objectResolver.resolveObjectMetadata(objectName);

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
