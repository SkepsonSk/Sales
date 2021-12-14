const express = require('express');
const router = express.Router();

const authenticationService = require('./../service/authenticationService');

router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    authenticationService.authenticate(username, password)
        .then( authData => {
            res.json({ok: true, token: authData.token});
        } )
        .catch( err => {
            res.status(401).json({ok: false, error: err});
        });
});

module.exports = router;
