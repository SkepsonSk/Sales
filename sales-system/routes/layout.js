const express = require('express');
const router = express.Router();

const layoutService = require('./../service/layout/layoutService');

router.get('/:objectName/:layoutName/:layoutType', async (req, res) => {
    const objectName = req.params.objectName;
    const layoutName = req.params.layoutName;
    const layoutType = req.params.layoutType;

    const fields = await layoutService.retrieve(objectName, layoutName, layoutType);

    res.json(fields);
});

module.exports = router;
