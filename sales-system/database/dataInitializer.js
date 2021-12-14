const database = require('./database');
const metadata = require('./../metadata/metadata');

// Deprecated
const initialize = () => {
    return new Promise( (resolve, reject) => {

        Promise.all([
            database.runSchema('tables/account.sql'),
            database.runSchema('tables/contact.sql'),
            database.runSchema('tables/client.sql'),
            database.runSchema('tables/opportunity.sql'),
            database.runSchema('tables/quote.sql')
        ])
            .then( () => {
                resolve();
            } )
            .catch( errors => {
                reject(errors);
            })

    } );
}

const initialize_v2 = async () => {
    const objectMetadata = await metadata.read('objects.json');

    for (const objectName of Object.keys(objectMetadata.objects)) {
        await database.runSchema(`tables/${objectName}.sql`);
    }

    return Promise.resolve();
}

exports.initialize = initialize_v2;
