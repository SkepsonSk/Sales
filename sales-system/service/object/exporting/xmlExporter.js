const Exporter = require('./exporter');
const fs = require('fs').promises;
const path = require('path');
const { XMLBuilder } = require('fast-xml-parser');

module.exports = class XMLExporter extends Exporter {

    async performExport(data, info){
        const fileName = info.fileName;
        const objectName = info.objectName;

        const today = new Date();
        const fileLabel = `${today.getDay()}${today.getMonth()}${today.getFullYear()}-${today.getHours()}${today.getMinutes()}.xml`;
        const completeFileName = path.join(fileName, fileLabel);

        const builder = new XMLBuilder({
            arrayNodeName: objectName,
            format: true
        });
        const xmlData = builder.build(data);

        try {
            await fs.writeFile(completeFileName, `<data>${xmlData}</data>`);
        } catch (e) {
            throw new Error(e);
        }
        
        return completeFileName;
    }

}
