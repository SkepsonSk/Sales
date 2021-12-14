const express = require('express');
const router = express.Router();

const authorizationService = require('../service/authorizationService');

router.post('/permitted', (req, res) => {
    const permissions = req.body.permissions;
    const authorizationHeader = req.header('Authorization');

    console.log(req.body);

    authorizationService.permissions(permissions, authorizationHeader)
        .then( () => {
            res.json({ok: true});
        } )
        .catch(err => {
            res.status(err.code).json({ok: false, error: err.error});
        })
});

module.exports = router;
