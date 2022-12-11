const ObjectExporter = require('@service/object/exporting/objectExporter');
const XMLExporter = require('@service/object/exporting/xmlExporter');

const loadExporters = async () => {
    console.info('[EXPORTING SYSTEM] Loading exporters...');

    ObjectExporter.registerExporter('xml', new XMLExporter());

    return Promise.resolve();
}

exports.loadExporters = loadExporters;


