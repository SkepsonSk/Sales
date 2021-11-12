const express = require('express');
const router = express.Router();

const metadata = require('./../metadata/metadata');

router.get('/:objectName/:layoutType', (req, res) => {
    const objectName = req.params.objectName;
    const layoutType = req.params.layoutType;

    metadata.read(`layout/${objectName}/default.json`)
        .then( layout => res.json(layout[layoutType]) )
        .catch( err => res.status(500).json({ok: false, err: err}) );
});

module.exports = router;
