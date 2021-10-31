const express = require('express');
const auth = require('./service/authorizerService');

const app = express();
//auth.configure('http://localhost:8180', 'ElementalShards', 'web-app', '55db7b30-8c85-41b0-8d35-a9c80bc9aa30');
auth.autoConfigure();

app.get('/test/authorized', auth.authorize(), (req, res) => {
   res.send('ok');
});

app.get('/test/authorized/edit', auth.authenticate('Account#delete'), (req, res) => {
   res.send('ok');
});

app.get('/test/authorized/scope/view', auth.requireScopes('profile'), (req, res) => {
   res.send('ok');
});

app.listen(19060 , () => console.log('[KEYCLOAK AUTH] Listening...'));
