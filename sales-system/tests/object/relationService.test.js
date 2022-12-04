const relation = require('./../../service/relation/relationService');

describe('Relation Service tests', () => {

    it('Should Retrieve All Relations with Valid Object', () => {
        relation.retrieveRelations('account')
            .then( obj => {
                expect( obj.length ).toBeGreaterThan(0);
            } )
            .catch( () => {} );
    });

    it('Should Retrieve No Relations with Invalid Object', () => {
        relation.retrieveRelations('INVALID')
            .then( obj => {
                expect( obj.length ).toBe(0);
            } )
            .catch( () => {} );
    });
})
