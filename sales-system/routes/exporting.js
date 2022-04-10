const express = require('express');
const router = express.Router();

const objectService = require('./../service/object/objectService');
const ObjectExporter = require('./../service/object/exporting/objectExporter');

router.get('/:exporter/:objectName', async (req, res) => {

    const exporter = req.params.exporter;
    const objectName = req.params.objectName;

    try {
        const data = await objectService.list(objectName);

        let info = {
            objectName: objectName
        };
        const exportedFileName = await ObjectExporter.performExport(exporter, data, info);

        res.sendFile(exportedFileName);
    } catch (e) {
        res.status(500);
    }
});

module.exports = router;
