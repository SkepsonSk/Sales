const objectService = require('../../../service/object/objectService');
const Trigger = require('../../../trigger/triggerCore/trigger');

module.exports = class ContractTrigger extends Trigger {

    async afterInsert(newObject) {
        const quoteLines = await objectService.list('quoteline', `quote='${newObject.quote}'`);
        for (const quoteLine of quoteLines) {
            await objectService.create('contractitem', {
                name: quoteLine.name,
                productname: quoteLine.name,
                productprice: quoteLine.price,
                productquantity: quoteLine.quantity,
                contract: newObject.id
            });
        }
    }
}
