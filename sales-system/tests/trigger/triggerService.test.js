const triggerService = require('../../trigger/triggerCore/triggerService');
const ContractTrigger = require('../../trigger/contractTrigger');

describe('Trigger Service tests', () => {

    it('Should register trigger', () => {
        triggerService.registerTrigger('quoteLine', new ContractTrigger());
        const canRun = triggerService.canRun('quoteLine');
        expect(canRun).toBe(true);
    });

});



