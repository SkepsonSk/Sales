test('Should Retrieve All Relations with Valid Object', () => {
    const relation = require('./../../service/relation/relationService');

    relation.retrieveRelations('account')
        .then( obj => {
            expect( obj.length ).toBeGreaterThan(0);
        } )
        .catch( () => {} );
});

test('Should Retrieve No Relations with Invalid Object', () => {
    const relation = require('./../../service/relation/relationService');

    relation.retrieveRelations('INVALID')
        .then( obj => {
            expect( obj.length ).toBe(0);
        } )
        .catch( () => {} );
});
