const database = require('./database')

const initialize = () => {

    Promise.all([
        database.runSchema('tables/account.sql'),
        database.runSchema('tables/contact.sql'),
    ])
        .then( () => {
            console.log('Data initialized successfully.');
        } )
        .catch( errors => {
            console.log(errors);
        })

}

exports.initialize = initialize;
