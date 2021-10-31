const axios = require('axios');
const fs = require('fs');

let _configured = false;

let _url = null;
let _userinfoEndpoint = null;
let _tokenEndpoint = null;
let _tokenIntrospectEndpoint = null;

let _clientId = null;
let _clientSecret = null;

let _keycloak;

const autoConfigure = () => {
    const keycloakFile = `${__dirname}/../keycloak.json`;
    console.log(keycloakFile);

    fs.readFile(keycloakFile, 'utf8', (err, data) => {

        if (err) {
            return false;
        }

        _keycloak = JSON.parse(data);

        const realm = _keycloak['realm'];
        _url = `${_keycloak['auth-server-url']}realms/${realm}`;

        _userinfoEndpoint = `${_url}/protocol/openid-connect/userinfo`;
        _tokenEndpoint = `${_url}/protocol/openid-connect/token`;
        _tokenIntrospectEndpoint = `${_url}/protocol/openid-connect/token/introspect`;

        _clientId = _keycloak['resource'];
        _clientSecret = _keycloak['credentials']['secret'];

        _configured = true;
    });
}

const configure = (hostname, realm, clientId, clientSecret) => {
    _url = `${hostname}/auth/realms/${realm}`;
    _userinfoEndpoint = `${_url}/protocol/openid-connect/userinfo`;
    _tokenEndpoint = `${_url}/protocol/openid-connect/token`;
    _tokenIntrospectEndpoint = `${_url}/protocol/openid-connect/token/introspect`;


    _clientId = clientId;
    _clientSecret = clientSecret;

    _configured = true;
}

const authorize = () => {
    return (req, res, next) => {
        if (!_configured){
            res.status(500).json({error: 'Authorization service not configured.'});
        }
        else {
            const authorizationHeader = req.get('Authorization');

            axios.get(_userinfoEndpoint, {
                headers: {
                    Authorization: authorizationHeader
                }
            })
                .then( () => {
                    next();
                })
                .catch( () => {
                    res.status(401).json({error: 'Unauthorized'});
                });
        }
    }
}

const authenticate = (permissions) => {
    return (req, res, next) => {
        if (!_configured){
            res.status(500).json({error: 'Authorization service not configured.'});
        }
        else {
            const authorizationHeader = req.get('Authorization');

            const params = new URLSearchParams()
            params.append('grant_type', 'urn:ietf:params:oauth:grant-type:uma-ticket');
            params.append('audience', _clientId);
            params.append('response_type', 'decision');

            if (Array.isArray(permissions)) {
                permissions.forEach( permission => params.append('permission', permission));
            }
            else {
                params.append('permission', permissions);
            }

            const config = {
                headers: {
                    'Authorization': authorizationHeader,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.post(_tokenEndpoint, params, config)
                .then( () => {
                    next();
                } )
                .catch( err => {

                    const statusCode = err.response.status;
                    if (statusCode === 401) {
                        res.status(401).json({error: 'Unauthorized'});
                    }
                    else {
                        res.status(403).json({error: 'Access denied'});
                    }


                });

        }
    }
}

const requireScopes = (scopesRequested) => {
    return (req, res, next) => {
        if (!_configured){
            res.status(500).json({error: 'Authorization service not configured.'});
        }
        else {
            const authorizationToken = req.get('Authorization').substring(7);

            const params = new URLSearchParams()
            params.append('token', authorizationToken);
            params.append('client_id', _clientId);
            params.append('client_secret', _clientSecret);

            axios.post(_tokenIntrospectEndpoint, params)
                .then( response => {

                    const token = response.data;

                    if (token.active) {
                        const scopes = token.scope.split(' ');

                        let allow = true;
                        if (Array.isArray(scopesRequested)) {
                            for (let i = 0 ; i < scopes.length ; i++) {
                                if (!scopes.includes(scopesRequested[i])) {
                                    allow = false;
                                    break;
                                }
                            }
                        }
                        else {
                            allow = scopes.includes(scopesRequested);
                        }

                        if (allow) {
                            next();
                        }
                        else {
                            res.status(403).json({error: 'Access denied'});
                        }

                    }
                    else {
                        res.status(403).json({error: 'Access denied'});
                    }

                } )
                .catch( error => {
                    console.log(error);
                    res.status(500).json({error: 'Internal Authorization Server Error'});
                });
        }
    }
}

module.exports = {
    configure,
    authorize,
    authenticate,
    requireScopes,
    autoConfigure
}
