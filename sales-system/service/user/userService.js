const userUtils = require('./userUtils');

const getUser = (token) => {
    const jwt = userUtils.parseJWT(token);

    return {
        id: jwt.sub,
        name: jwt.name
    };
}

exports.getUser = getUser;
