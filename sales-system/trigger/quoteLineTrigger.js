const objectService = require('./../service/object/objectService');

objectService.triggerEmitter.on('quotelineAfterInsert', async objectData => {
    const quoteId = objectData.new.quote;
    const price = objectData.new.price * objectData.new.quantity;

    const quote = await objectService.retrieve('quote', quoteId);

    const quoteToUpdate = {
        quotePrice: quote.quotePrice + price
    };
    await objectService.update('quote', quoteId, quoteToUpdate);
});

objectService.triggerEmitter.on('quotelineAfterRemove', async objectData => {
    const quoteId = objectData.old.quote;
    const price = objectData.old.price * objectData.old.quantity;

    const quote = await objectService.retrieve('quote', quoteId);

    const quoteToUpdate = {
        quotePrice: quote.quotePrice - price
    };
    await objectService.update('quote', quoteId, quoteToUpdate);
});
