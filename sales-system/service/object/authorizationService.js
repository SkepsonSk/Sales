const axios = require('axios');

const userInfo = async (authorizationHeader) => {
    const authURL = process.env.AUTH_URL || 'http://localhost:19060';
    const config = {
        headers: {
            'Authorization': authorizationHeader
        }
    }

    try {
        const userInfo = await axios.get(`${authURL}/authentication/userinfo`, config);
        return Promise.resolve(userInfo);
    } catch (e) {
        return Promise.reject(e);
    }
}

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

exports.userInfo = userInfo;
exports.permitted = permitted;
