const express = require('express');
const router = express.Router();

const objectService = require('./../service/object/objectService');

router.get('/:objectName', (req, res) => {
    const filters = req.query.filters != null ? req.query.filters : null;
    const objectName = req.params.objectName;

    objectService.retrieve(objectName, filters)
        .then( data => res.json(data) )
        .catch( err => res.status(500).json(err) );
});

router.post('/:objectName', (req, res) => {
    const data = req.body;
    const objectName = req.params.objectName;

    objectService.create(objectName, data)
        .then( result => res.json({ok: true, affected: result.affectedRows}) )
        .catch( err => res.status(400).json({ok: false, error: err}));

});

router.put('/:objectName/:objectId', (req, res) => {
    const data = req.body;
    const objectName = req.params.objectName;
    const objectId = req.params.objectId;

    objectService.update(objectName, objectId, data)
        .then( result => res.json({ok: true, affected: result.affectedRows}) )
        .catch( err => res.status(400).json({ok: false, error: err}));
});

router.delete('/:objectName/:objectId', (req, res) => {
    const objectName = req.params.objectName;
    const objectId = req.params.objectId;

    objectService.remove(objectName, objectId)
        .then( result => res.json({ok: true, affected: result.affectedRows}) )
        .catch( err => res.status(400).json({ok: false, error: err}));
});

module.exports = router;
