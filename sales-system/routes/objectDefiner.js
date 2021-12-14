const objectDefiner = require('./../service/object/objectDefiner');

const express = require('express');
const router = express.Router();

router.post('/:objectName', async (req, res) => {
    const objectName = req.params.objectName;
    const objectDefinition = req.body;

    const definitionResult = await objectDefiner.defineObject(objectName, objectDefinition);

    res.json(definitionResult);
});

module.exports = router;
