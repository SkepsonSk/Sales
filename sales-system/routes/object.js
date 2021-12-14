const express = require('express');
const router = express.Router();

const objectService = require('./../service/object/objectService');
const objectUtil = require('./../service/object/objectUtil');
const authorizationService = require('./../service/object/authorizationService');

router.get('/:objectName', (req, res) => {
    const objectName = req.params.objectName;
    const authorizationHeader = req.header('Authorization');

    authorizationService.permitted([`${objectUtil.capitalizeFirstLetter(objectName)}#view`], authorizationHeader)
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
    const authorizationHeader = req.header('Authorization');

    authorizationService.permitted([`${objectUtil.capitalizeFirstLetter(objectName)}#view`], authorizationHeader)
        .then( () =>{
            objectService.retrieve(objectName, objectId)
                .then( data => res.json(data) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => {
            res.status(err.response.status).json({error: err.response.data.error});
        });
});

router.post('/:objectName', (req, res) => {
    const data = req.body;
    const objectName = req.params.objectName;
    const authorizationHeader = req.header('Authorization');

    authorizationService.permitted([`${objectUtil.capitalizeFirstLetter(objectName)}#create`], authorizationHeader)
        .then( async () =>{

            try {
                const result = await objectService.create(objectName, data);
                res.json({affected: result.affectedRows, id: result.id})
            } catch (error) {
                console.log(error);
                res.status(error.code).json({error: error.message});
            }

            /*objectService.create(objectName, data)
                .then( result => res.json({ok: true, affected: result.affectedRows, id: result.id}) )
                .catch( err => res.status(400).json({ok: false, error: err}));*/
        } )
        .catch( err => {
            res.status(err.response.status).json({error: err.response.data.error});
        });
});

router.put('/:objectName/:objectId', (req, res) => {
    const data = req.body;
    const objectName = req.params.objectName;
    const objectId = req.params.objectId;
    const authorizationHeader = req.header('Authorization');

    authorizationService.permitted([`${objectUtil.capitalizeFirstLetter(objectName)}#edit`], authorizationHeader)
        .then( async () =>{

            try {
                const result = await objectService.update(objectName, objectId, data)
                res.json({affected: result.affectedRows});
            } catch (error) {
                res.status(error.code).json({error: error.message});
            }

            /*objectService.update(objectName, objectId, data)
                .then( result => res.json({ok: true, affected: result.affectedRows}) )
                .catch( err => res.status(400).json({ok: false, error: err}));*/
        } )
        .catch( err => {
            res.status(err.response.status).json({error: err.response.data.error});
        });
});

router.delete('/:objectName/:objectId', (req, res) => {
    const objectName = req.params.objectName;
    const objectId = req.params.objectId;
    const authorizationHeader = req.header('Authorization');

    authorizationService.permitted([`${objectUtil.capitalizeFirstLetter(objectName)}#delete`], authorizationHeader)
        .then( async () =>{

            try {
                const result = await objectService.remove(objectName, objectId);
                res.json({affected: result.affectedRows});
            } catch (error) {
                res.status(error.code).json({error: error.message});
            }

            /*objectService.remove(objectName, objectId)
                .then( result => res.json({ok: true, affected: result.affectedRows}) )
                .catch( err => res.status(400).json({ok: false, error: err}));*/
        } )
        .catch( err => {
            res.status(err.response.status).json({error: err.response.data.error});
        });
});

router.get('/', (req, res) => {
    objectService.retrieveObjectNames()
        .then( objectNames => res.json(objectNames) )
        .catch(err => res.status(500).json({ok: false, error: err}));
})

module.exports = router;
