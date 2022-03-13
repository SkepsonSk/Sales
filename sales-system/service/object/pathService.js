const metadata = require('./../../metadata/metadata');

const retrievePath = async (pathName) => {
    const pathData = await metadata.read(`path/${pathName}.json`);
    return pathData.path;
}

exports.retrievePath = retrievePath;
