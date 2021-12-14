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

const KeycloakManager = require('./service/manageService');
const manager = new KeycloakManager('admin', '123');

/*manager.retrieveClientScopes('web-app')
    .then( scopes => {

        manager.createResource('web-app', 'Pricebook', 'Pricebook', scopes)
            .then( res => console.log(res) )
            .catch( err => console.log(err) );
    })
    .catch( error => console.log(error) );*/


/*manageService.createPolicy('61eb7b0f-7cd5-4439-8df0-4d662335f6bd', 'Test Deleter', ['test_deleter'])
    .then( res => console.log(res) )
    .catch( err => console.log(err) );*/

app.listen(19060 , () => console.log('[KEYCLOAK AUTH] Listening...'));
