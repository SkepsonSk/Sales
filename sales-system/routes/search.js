const express = require('express');
const objectService = require('../service/object/objectService');
const router = express.Router();

router.get('/', async (req, res) => {
    const search = req.query.phrase;
    if (!search) {
        res.status(400).json({err: 'Wrong phrase param'});
    }
    else {
        const results = await objectService.search(search);
        res.send(results);
    }
});

module.exports = router;
