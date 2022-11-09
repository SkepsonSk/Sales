const objectService = require('./../service/object/objectService');
const Trigger = require('./triggerCore/trigger');

module.exports = class QuoteLineTrigger extends Trigger {

    async beforeInsert(newObject) {
        const product = await objectService.retrieve('product', newObject.product, ['name', 'price']);

        newObject.name = product.name;
        newObject.price = product.price;

        return Promise.resolve();
    }

    async afterInsert(newObject) {
        const quoteId = newObject.quote;
        const price = newObject.price * newObject.quantity;

        const quote = await objectService.retrieve('quote', quoteId);

        const quoteToUpdate = {
            quotePrice: parseFloat(quote.quotePrice) + price
        };
        await objectService.update('quote', quoteId, quoteToUpdate);
    }

    async afterRemove(oldObject) {
        const quoteId = oldObject.quote;
        const price = oldObject.price * oldObject.quantity;

        const quote = await objectService.retrieve('quote', quoteId);

        const quoteToUpdate = {
            quotePrice: parseFloat(quote.quotePrice) - price
        };
        await objectService.update('quote', quoteId, quoteToUpdate);
    }
}
