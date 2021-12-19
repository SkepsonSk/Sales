const objectDefiner = require('./../service/object/objectDefiner');

const express = require('express');
const router = express.Router();

router.post('/object/:objectName', async (req, res) => {
    const objectName = req.params.objectName;
    const objectDefinition = req.body;

    const definitionResult = await objectDefiner.defineObject(objectName, objectDefinition);

    res.json(definitionResult);
});

router.post('/layout/:objectName/:objectType', async (req, res) => {
    const objectName = req.params.objectName;
    const objectType = req.params.objectType;
    const layoutDefinition = req.body;

    const definitionResult = await objectDefiner.defineLayout(objectName, objectType, layoutDefinition);

    res.json(definitionResult);
});

module.exports = router;
