const axios = require('axios');

const permitted = (permissions, authorizationHeader) => {
    return new Promise( (resolve, reject) => {

        const config = {
            headers: {
                'Authorization': authorizationHeader,
                'Content-Type': 'application/json'
            }
        }

        axios.post('http://localhost:19060/authorization/permitted', {
            permissions: permissions
        }, config)
            .then( () => resolve() )
            .catch( err => {
                reject(err);
            } );

    } );
}

exports.permitted = permitted;
