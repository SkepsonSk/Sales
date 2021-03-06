const express = require('express');
const auth = require('./service/authorizationService');
const cors = require('cors');

const authenticationService = require('./service/authenticationService');
const authentication = require('./routes/authentication');
const authorization = require('./routes/authorization');

const app = express();

const dashboardServer = process.env.DASHBOARD_URL || 'http://localhost:4200';
app.use(cors({ origin: dashboardServer, optionsSuccessStatus: 200 }));
app.use(express.json());

auth.autoConfigure();
authenticationService.autoConfigure();

app.use('/authentication', authentication);
app.use('/authorization', authorization);

const port = process.env.PORT || 19060;
app.listen(port , () => console.log('[KEYCLOAK AUTH] Listening...'));
