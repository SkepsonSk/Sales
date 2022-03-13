const objectService = require('./../service/object/objectService');
const opportunityContractService = require('../service/opportunity/opportunityContractService');

objectService.triggerEmitter.on('opportunityAfterUpdate', objectData => {
    const oldOpportunity = objectData.old;
    const newOpportunity = objectData.new;

    opportunityContractService.execute(oldOpportunity, newOpportunity);
});
