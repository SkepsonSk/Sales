const express = require('express');
const router = express.Router();

const pathService = require('./../service/object/pathService');

router.get('/:pathName', async (req, res) => {
    const pathName = req.params.pathName;
    const pathData = await pathService.retrievePath(pathName);
    res.json(pathData);
});

module.exports = router;
