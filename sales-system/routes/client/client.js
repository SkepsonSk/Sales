const express = require('express');
const router = express.Router();

const clientService = require('./../../service/client/clientService');

router.get('/convert/:clientId', async (req, res) => {
    const clientId = req.params.clientId;

    try {
        const acceptanceData = await clientService.convertClient(clientId);
        res.json(acceptanceData);
    }
    catch (err) {
        res.status(err.code).json({error: err.message});
    }
});

module.exports = router;
