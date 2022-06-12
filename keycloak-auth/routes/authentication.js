const express = require('express');
const router = express.Router();

const authenticationService = require('./../service/authenticationService');

router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    authenticationService.authenticate(username, password)
        .then( authData => {
            res.json({
                ok: true,
                name: authData.name,
                token: authData.token,
                refreshToken: authData.refreshToken,
                expires: {
                    token: authData.expires.token,
                    refreshToken: authData.expires.refreshToken
                }
            });
        } )
        .catch( err => {
            res.status(401).json({ok: false, error: err});
        });
});

module.exports = router;
