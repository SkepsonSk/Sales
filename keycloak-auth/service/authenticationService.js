const axios = require('axios');
const fs = require('fs');

const authUtils = require('./authUtils');

let url = null;
let authenticationUrl = null;
let userInfoUrl = null;

let clientId = null;
let clientSecret = null;

const TOKENS = new Map();

const autoConfigure = () => {
    const keycloakFile = `${__dirname}/../keycloak.json`;

    fs.readFile(keycloakFile, 'utf8', (err, data) => {
        if (err) {
            return false;
        }

        const keycloak = JSON.parse(data);

        clientId = keycloak['resource'];
        clientSecret = keycloak['credentials']['secret'];

        const realm = keycloak['realm'];

        url = `${keycloak['auth-server-url']}realms/${realm}`;
        authenticationUrl = `${url}/protocol/openid-connect/token`;
        userInfoUrl = `${url}/protocol/openid-connect/userinfo`;
    });
}

const authenticate = (username, password) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'password');

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    return new Promise( (resolve, reject) => {
        axios.post(authenticationUrl, params, config)
            .then( async authData => {
                const token = authData.data['access_token'];
                const tokenObject = {
                    expiration: {
                        token: authData.data['expires_in'],
                        refresh: authData.data['refresh_expires_in']
                    },
                    refreshToken: authData.data['refresh_token']
                };

                const jwt = authUtils.parseJWT(token);

                TOKENS.set(token, tokenObject);
                resolve({
                    name: jwt.name,
                    token: token,
                    refreshToken: authData.data['refresh_token'],
                    expires: {
                        token: authData.data['expires_in'],
                        refreshToken: authData.data['refresh_expires_in']
                    }
                });
            } )
            .catch( err => {
                reject(err);
            });
    } );
}

const userInfo = async (authorizationHeader) => {
    const config = {
        headers: {
            'Authorization': authorizationHeader,
        }
    }

    try {
        const info = await axios.get(userInfoUrl, config);
        return Promise.resolve(info.data);
    } catch (e) {
        return Promise.reject(e);
    }
}

exports.autoConfigure = autoConfigure;
exports.authenticate = authenticate;
exports.userInfo = userInfo;
