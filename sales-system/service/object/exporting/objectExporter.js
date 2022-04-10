const path = require('path');

module.exports = class ObjectExporter {

    static exporters = new Map();

    static registerExporter(exporterName, exporter) {
        ObjectExporter.exporters.set(exporterName, exporter);
        console.log(`[EXPORTING SYSTEM] Registered ${exporterName} exporter.`);
    }

    static performExport(exporterName, data, info) {
        const exporter = ObjectExporter.exporters.get(exporterName);

        if (exporterName != null) {
            info.fileName = path.join(__dirname, '../../../exports/xml');
            return exporter.performExport(data, info);
        }
        else {
            throw new Error(`Unknown exporter: ${exporterName}.`);
        }
    }
}
