const { GenericContainer } = require('testcontainers');

const database = require('@database/database');
const triggerLoader = require('@loader/triggerLoader');
const objectService = require('@service/object/objectService');

jest.setTimeout(20000);
describe('Quote Line Trigger Service', () => {

    let testContainer;

    beforeAll( async () => {
        const container = await GenericContainer.fromDockerfile(__dirname + '/..').build()
        testContainer = await container
            .withEnv('MARIADB_USER', 'test')
            .withEnv('MARIADB_PASSWORD', 'test')
            .withEnv('MARIADB_DATABASE', 'test')
            .withEnv('MARIADB_ROOT_PASSWORD', 'test')
            .withExposedPorts(3306)
            .start();

        database.configure(
            testContainer.getContainerIpAddress(),
            'test',
            'test',
            'test',
            testContainer.getMappedPort(3306)
        );

        await triggerLoader.loadTriggers();
    });

    afterAll( () => {
        testContainer.stop();
    } );

    it('Should Create Quote Line with Product Name', async () => {
        const result = await objectService.create('quoteLine', {
            type: 'Default',
            quote: '002-0406b4b9-8905-4b25-8136-e3b20e580a1e',
            product: '003-0406b4b9-8905-4b25-8136-e3b20e580a1e',
            quantity: 10
        });

        const quoteLine = await objectService.retrieve('quoteline', result.id);

        expect(quoteLine.name).toBe('Product 1');
        expect(parseFloat(quoteLine.price)).toBe(500);
    });

    it('Should Calculate Quote Total Price on Quote Line Creation', async () => {
        await objectService.create('quoteLine', {
            type: 'Default',
            quote: '002-0406b4b9-8905-4b25-8136-e3b20e580a1f',
            product: '003-0406b4b9-8905-4b25-8136-e3b20e580a1e',
            quantity: 10
        });

        const quote = await objectService.retrieve('quote', '002-0406b4b9-8905-4b25-8136-e3b20e580a1f');

        expect(parseFloat(quote.quotePrice)).toBe(5000);
    });

    it('Should Calculate Quote Total Price on Quote Line Removal', async () => {
        const result = await objectService.create('quoteLine', {
            type: 'Default',
            quote: '002-0406b4b9-8905-4b25-8136-e3b20e580a1g',
            product: '003-0406b4b9-8905-4b25-8136-e3b20e580a1e',
            quantity: 10
        });

        await objectService.remove('quoteline', result.id);

        const quote = await objectService.retrieve('quote', '002-0406b4b9-8905-4b25-8136-e3b20e580a1f');

        expect(parseFloat(quote.quotePrice)).toBe(0);
    });
})



