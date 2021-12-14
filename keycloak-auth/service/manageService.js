const axios = require('axios');

let adminUsername = 'admin';
let adminPassword = '123';
let url = 'http://localhost:8180/auth/realms/master/protocol/openid-connect/token';

module.exports = class KeycloakManager {

    constructor(adminUsername, adminPassword) {
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
        this.token = null;

        this.clients = new Map();
        this.scopes = new Map();
        this.resources = new Map();
    }

    authenticate () {
        const params = new URLSearchParams();
        params.append('username', this.adminUsername);
        params.append('password', this.adminPassword);
        params.append('client_id', 'admin-cli');
        params.append('grant_type', 'password');

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return new Promise( (resolve, reject) => {
            if (this.token != null) {
                resolve(this.token);
            }
            else {
                axios.post(url, params, config)
                    .then( authData => {
                        this.token = authData.data['access_token'];
                        resolve(this.token);
                    } )
                    .catch( err => {
                        reject(err);
                    });
            }
        } );
    }

    retrieveClient (clientId) {
        return new Promise( (resolve, reject) => {

            if (this.clients.has(clientId)) {
                resolve(this.clients.get(clientId));
            }
            else {
                this.authenticate()
                    .then( token => {

                        const config = {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }

                        axios.get('http://localhost:8180/auth/admin/realms/ElementalShards/clients', config)
                            .then( clients => {
                                let targetClient = null;

                                for (const client of clients.data) {
                                    this.clients.set(client.clientId, client);

                                    if (client.clientId === clientId) {
                                        targetClient = client;
                                        break;
                                    }
                                }

                                if (targetClient != null) {
                                    resolve(targetClient);
                                }
                                else {
                                    reject(null);
                                }
                            } )
                            .catch( err => reject(err));

                    } )
                    .catch( err => reject(err));
            }
        } );
    }

    retrieveClientScopes (clientId) {
        return new Promise( (resolve, reject) => {

            if (this.scopes.keys().length > 0) {
                return this.scopes.values();
            }
            else {
                this.retrieveClient(clientId)
                    .then( client => {
                        const id = client.id;

                        this.authenticate()
                            .then( token => {
                                const config = {
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }

                                const url = `http://localhost:8180/auth/admin/realms/ElementalShards/clients/${id}/authz/resource-server/scope`

                                axios.get(url, config)
                                    .then( scopesData => {
                                        scopesData.data.forEach(scope => {
                                            this.scopes.set(scope.name, scope);
                                        });
                                        resolve(scopesData.data);
                                    } )
                                    .catch( error => {
                                        reject(error);
                                    });
                            } );

                    } )
                    .catch(error => {
                        reject(error);
                    });
            }
        } );
    }

    createResource (clientId, resourceDisplayName, resourceName, scopes) {
        return new Promise( (resolve, reject) => {

            this.retrieveClient(clientId)
                .then( client => {

                    this.authenticate()
                        .then( token => {

                            const url = `http://localhost:8180/auth/admin/realms/ElementalShards/clients/${client.id}/authz/resource-server/resource`;

                            const config = {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            };

                            console.log('sending');

                            axios.post(url, {
                                displayName: resourceDisplayName,
                                name: resourceName,
                                owner: {
                                    id: client.id,
                                    name: clientId
                                },
                                scopes: scopes

                            }, config)
                                .then( creationResult => {
                                    this.resources.set(creationResult.data.name, creationResult.data);
                                    resolve(creationResult.data);
                                } )
                                .catch( error => {
                                    reject(error);
                                })

                        } )
                        .catch(error => {
                            reject(error);
                        })

                } )
                .catch( error => {
                    reject(error);
                })

        });
    }
}

const authenticate = () => {
    const params = new URLSearchParams();
    params.append('username', adminUsername);
    params.append('password', adminPassword);
    params.append('client_id', 'admin-cli');
    params.append('grant_type', 'password');

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    return new Promise( (resolve, reject) => {
        axios.post(url, params, config)
            .then( authData => {
                const token = authData.data['access_token'];
                resolve({ token: token });
            } )
            .catch( err => {
                reject(err);
            });
    } );
}

/*const retrieveClient = (clientId) => {

    return new Promise( (resolve, reject) => {
        authenticate()
            .then( tokenData => {
                const token = tokenData.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                axios.get('http://localhost:8180/auth/admin/realms/ElementalShards/clients', config)
                    .then( clients => {

                        let targetClient = null;

                        for (const client of clients.data) {
                            if (client.clientId === clientId) {
                                targetClient = client;
                                break;
                            }
                        }

                        if (targetClient != null) {
                            resolve(targetClient);
                        }
                        else {
                            reject(null);
                        }

                    } )
                    .catch( err => reject(err));

            } )
            .catch( err => reject(err));
    } )

}

const retrieveClientScopes = (clientId) => {
    return new Promise( (resolve, reject) => {
        retrieveClient(clientId)
            .then( client => {

                const id = client.id;

                authenticate()
                    .then( tokenData => {

                        const token = tokenData.token;

                        const config = {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }

                        const url = `http://localhost:8180/auth/admin/realms/ElementalShards/clients/${id}/authz/resource-server/scope`

                        axios.get(url, config)
                            .then( scopesData => {
                                resolve(scopesData.data);
                            } )
                            .catch( error => {
                                reject(error);
                            });

                    } );

            } )
            .catch(error => {
                reject(error);
            });
    } )
}

const createResource = (id, clientId, resourceDisplayName, resourceName, scopes) => {
    return new Promise( (resolve, reject) => {

        authenticate()
            .then( tokenData => {

                const token = tokenData.token;
                const url = `http://localhost:8180/auth/admin/realms/ElementalShards/clients/${id}/authz/resource-server/resource`;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                axios.post(url, {
                    displayName: resourceDisplayName,
                    name: resourceName,
                    owner: {
                        id: id,
                        name: clientId
                    },
                    scopes: scopes

                }, config)
                    .then( creationResult => {
                        resolve(creationResult.data);
                    } )
                    .catch( error => {
                        reject(error);
                    })

            } )
            .catch(error => {
                reject(error);
            })

    });
}

const createRealmRole = (roleName) => {
    return new Promise( (resolve, reject) => {

        const url = 'http://localhost:8180/auth/admin/realms/ElementalShards/roles';

        authenticate()
            .then( tokenData => {

                const token = tokenData.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                axios.post(url, {
                    name: roleName,
                    composite: false,
                    clientRole: false,
                    containerId: 'ElementalShards'

                }, config )
                    .then( creationResult => {
                        resolve(creationResult.data);
                    } )
                    .catch( error => {
                        reject(error);
                    } )

            } )
            .catch( error => {
                reject(error);
            } )

    } );
}

const retrieveRealmRoles = () => {
    const url = 'http://localhost:8180/auth/admin/realms/ElementalShards/roles/';
    return new Promise( (resolve, reject) => {
        authenticate()
            .then( tokenData => {

                const token = tokenData.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }

                axios.get(url, config)
                    .then( retrieveResult => {
                        resolve(retrieveResult.data);
                    } )
                    .catch( error => {
                        reject(error);
                    } )

            } )
            .catch( error => {
                reject(error);
            });
    });

}

const createPolicy = (id, name, roleNames) => {
    const url = `http://localhost:8180/auth/admin/realms/ElementalShards/clients/${id}/authz/resource-server/policy/role`;

    return new Promise( (resolve, reject) => {

        authenticate()
            .then( tokenData => {

                const token = tokenData.token;

                retrieveRealmRoles()
                    .then( roles => {

                        let rolesList = [];

                        roles.forEach( role => {
                            if (roleNames.includes(role.name)) {
                                rolesList.push( { id: role.id, required: false } );
                            }
                        } );

                        console.log(rolesList);

                        const config = {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }

                        axios.post(url, {
                            name: name,
                            decisionStrategy: 'UNANIMOUS',
                            logic: 'POSITIVE',
                            roles: rolesList
                        }, config)
                            .then( creationResult => {
                                resolve(creationResult.data);
                            } )
                            .catch( error => {
                                reject(error);
                            });

                    } )
                    .catch( error => {
                        reject(error);
                    });

            } )
            .catch( error => {
                reject(error);
            } );

    } );
}

const createPermission = (id, name, policies, resources, scopes) => {
    const url = `http://localhost:8180/auth/admin/realms/ElementalShards/clients/${id}/authz/resource-server/permission/scope`;

    return new Promise( (resolve, reject) => {

        authenticate()
            .then( tokenData => {

                const token = tokenData.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }

                axios.post(url, {
                    name: name,
                    decisionStrategy: 'UNANIMOUS',
                    logic: 'POSITIVE',
                    policies: policies,
                    resources: resources,
                    scopes: scopes
                }, config)
                    .then( creationResult => {
                        resolve(creationResult);
                    } )
                    .catch( error => {
                        reject(error);
                    } )

            } )
            .catch( error => {
                reject(error);
            } );

    } );
}

exports.retrieveClient = retrieveClient;
exports.retrieveClientScopes = retrieveClientScopes;
exports.createResource = createResource;
exports.createRealmRole = createRealmRole;
exports.retrieveRealmRoles = retrieveRealmRoles;
exports.createPolicy = createPolicy;*/
