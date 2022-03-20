const axios = require('axios');

const permitted = (permissions, authorizationHeader) => {
    return new Promise( (resolve, reject) => {

        const config = {
            headers: {
                'Authorization': authorizationHeader,
                'Content-Type': 'application/json'
            }
        }

        const authURL = process.env.AUTH_URL || 'http://localhost:19060';
        axios.post(`${authURL}/authorization/permitted`, {
            permissions: permissions
        }, config)
            .then( () => resolve() )
            .catch( err => {
                reject(err);
            } );

    } );
}

exports.permitted = permitted;
