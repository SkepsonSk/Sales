const objectService = require('./../object/objectService');

//TODO move to some kind of module
const convertClient = async (clientId) => {
    const client = await objectService.retrieve('client', clientId);
    if (client == null) {
        const error = Error('No client found under given id.');
        error.status = 404;
        throw error;
    }

    const company = client.company;
    const account = await objectService.create('account', {
        name: company
    });

    const firstName = client.firstName;
    const lastName = client.lastName;
    const contact = await objectService.create('contact', {
        name: `${firstName} ${lastName}`,
        account: account.id
    });

    const year = new Date().getFullYear();
    const opportunity = await objectService.create('opportunity', {
        name: `${company} ${year}`,
        account: account.id
    });

    await objectService.remove('client', clientId);

    const acceptanceResult = {
        account: account.id,
        contact: contact.id,
        opportunity: opportunity.id
    }

    return Promise.resolve(acceptanceResult);
}

exports.convertClient = convertClient;
