const {
    v1: uuidv1,
    v4: uuidv4
} = require('uuid');

const generateID = (objectName) => {
    return `000-${uuidv4()}`;
}

exports.generateID = generateID;
