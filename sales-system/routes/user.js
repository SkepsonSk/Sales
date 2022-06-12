const express = require('express');
const router = express.Router();

const userService = require('./../service/user/userService');

router.get('/', (req, res) => {

    const authorizationHeader = req.header('Authorization') != null ?
        req.header('Authorization') : '';

    const jwtToken = authorizationHeader.substring(7, authorizationHeader.length);
    const user = userService.getUser(jwtToken);

    res.json(user);
});

module.exports = router;
