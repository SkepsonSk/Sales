const express = require('express');
const auth = require('./service/authorizationService');
const cors = require('cors');

const authenticationService = require('./service/authenticationService');
const authentication = require('./routes/authentication');
const authorization = require('./routes/authorization');

const app = express();
app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));
app.use(express.json());

auth.autoConfigure();
authenticationService.autoConfigure();

app.use('/authentication', authentication);
app.use('/authorization', authorization);

app.listen(19060 , () => console.log('[KEYCLOAK AUTH] Listening...'));
