const objectService = require('../object/objectService');

const execute = async (oldOpportunity, newOpportunity) => {
    if (shouldConvert(oldOpportunity, newOpportunity)) {
        await generateContract(oldOpportunity, newOpportunity);
    }
}

const shouldConvert = (oldOpportunity, newOpportunity) => {
    return (newOpportunity.status === 'closed'
        && oldOpportunity.status !== newOpportunity.status);
}

const generateContract = async(oldOpportunity, newOpportunity) => {
    console.log('Generating Contract...');

    const opportunity = await objectService.retrieve('opportunity', oldOpportunity.id);

    console.log(opportunity);

    const contractData = {
        name: opportunity.name,
        opportunity: opportunity.id
    };

    await objectService.create('contract', contractData);
}

exports.execute = execute;
