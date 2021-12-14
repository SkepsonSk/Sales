const express = require('express');
const router = express.Router();

const clientService = require('./../../service/client/clientService');

router.get('/convert/:clientId', async (req, res) => {
    const clientId = req.params.clientId;

    try {
        await clientService.convertClient(clientId);
        res.json({ok: true});
    }
    catch (err) {
        res.status(err.status).json({ok: false, error: err.message});
    }
});

module.exports = router;
