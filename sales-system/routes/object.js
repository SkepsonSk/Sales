const express = require('express');
const router = express.Router();

const objectService = require('./../service/object/objectService');
const authorizationService = require('./../service/object/authorizationService');

router.get('/:objectName', (req, res) => {
    const objectName = req.params.objectName;
    const authorizationHeader = req.header('Authorization') != null ? req.header('Authorization') : '';

    authorizationService.permitted([`Object#view`], authorizationHeader)
        .then( () =>{
            objectService.list(objectName)
                .then( data => res.json(data) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => {
            res.status(err.response.status).json({error: err.response.data.error});
        });
});

router.get('/:objectName/:objectId', (req, res) => {
    const objectName = req.params.objectName;
    const objectId = req.params.objectId;
    const authorizationHeader = req.header('Authorization') != null ? req.header('Authorization') : '';

    const fields = req.query?.fields;

    authorizationService.permitted([`Object#view`], authorizationHeader)
        .then( () =>{
            objectService.retrieve(objectName, objectId, fields)
                .then( data => res.json(data) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => {
            console.log(err);
            res.status(err.response.status).json({error: err.response.data.error});
        });
});

router.get('/:objectName/:objectId/:layoutName/:type', (req, res) => {
    const objectName = req.params.objectName;
    const objectId = req.params.objectId;
    const layoutName = req.params.layoutName;
    const type = req.params.type;
    const authorizationHeader = req.header('Authorization') != null ? req.header('Authorization') : '';

    authorizationService.permitted([`Object#view`], authorizationHeader)
        .then( () =>{
            objectService.layout(objectName, objectId, layoutName, type)
                .then( data => res.json(data) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => {
            console.log(err);
            res.status(err.response.status).json({error: err.response.data.error});
        });
});

/* Deprecated */
/*router.get('/:objectName/:objectId/edit', (req, res) => {
    const objectName = req.params.objectName;
    const objectId = req.params.objectId;
    const authorizationHeader = req.header('Authorization') != null ? req.header('Authorization') : '';

    authorizationService.permitted([`Object#view`], authorizationHeader)
        .then( () =>{
            objectService.retrieveForEdit(objectName, objectId)
                .then( data => res.json(data) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => {
            res.status(err.response.status).json({error: err.response.data.error});
        });
});*/

router.post('/:objectName', (req, res) => {
    const data = req.body;
    const objectName = req.params.objectName;
    const authorizationHeader = req.header('Authorization') != null ? req.header('Authorization') : '';

    authorizationService.permitted([`Object#create`], authorizationHeader)
        .then( async () =>{

            try {
                const result = await objectService.create(objectName, data);
                res.json({affected: result.affectedRows, id: result.id})
            } catch (err) {
                if (err.code == null || isNaN(err.code)) {
                    err.code = 500;
                }

                res.status(err.code).json({error: err.message});
            }

        } )
        .catch( err => {
            if (err.response?.status == null || isNaN(err.response.status)) {
                err.code = 500;
            }
            res.status(err.response.status).json({error: err.response.data.error});
        });
});

router.put('/:objectName/:objectId', (req, res) => {
    const data = req.body;
    const objectName = req.params.objectName;
    const objectId = req.params.objectId;
    const authorizationHeader = req.header('Authorization') != null ? req.header('Authorization') : '';

    authorizationService.permitted([`Object#edit`], authorizationHeader)
        .then( async () =>{

            try {
                const result = await objectService.update(objectName, objectId, data)
                res.json({affected: result.affectedRows});
            } catch (err) {
                if (err.code == null || isNaN(err.code)) {
                    err.code = 500;
                }
                res.status(err.code).json({error: err.message});
            }

        } )
        .catch( err => {
            console.log(err);
            if (err.response?.status == null || isNaN(err.response.status)) {
                err.code = 500;
            }
            res.status(err.response.status).json({error: err.response.data.error});
        });
});

router.delete('/:objectName/:objectId', (req, res) => {
    const objectName = req.params.objectName;
    const objectId = req.params.objectId;
    const authorizationHeader = req.header('Authorization') != null ? req.header('Authorization') : '';

    authorizationService.permitted([`Object#delete`], authorizationHeader)
        .then( async () =>{

            try {
                const result = await objectService.remove(objectName, objectId);
                res.json({affected: result.affectedRows});
            } catch (err) {
                if (err.code == null || isNaN(err.code)) {
                    err.code = 500;
                }
                res.status(err.code).json({error: err.message});
            }

        } )
        .catch( err => {
            if (err.response?.status == null || isNaN(err.response.status)) {
                err.code = 500;
            }
            res.status(err.response.status).json({error: err.response.data.error});
        });
});

router.get('/', (req, res) => {
    objectService.retrieveObjectNames()
        .then( objectNames => res.json(objectNames) )
        .catch(err => res.status(500).json({ok: false, error: err}));
})

module.exports = router;
