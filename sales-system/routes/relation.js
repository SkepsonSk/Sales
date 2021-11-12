const express = require('express');
const router = express.Router();

const relationService = require('../service/relation/relationService');

router.get('/:objectName', (req, res) => {
    const objectName = req.params.objectName;

    relationService.retrieveRelations(objectName)
        .then( relations => res.json(relations) )
        .catch( err => res.status(500).json(err) );
});

router.get('/:objectName/:relationName/:objectId', (req, res) => {
    const objectName = req.params.objectName;
    const relationName = req.params.relationName;
    const objectId = req.params.objectId;

    relationService.retrieveRelationObjects(objectName, relationName, objectId)
        .then( objects => res.json(objects) )
        .catch( err => res.status(500).json( {ok: false, error: err} ));
});

module.exports = router;
