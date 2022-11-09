const { GenericContainer } = require('testcontainers')

const database = require('./../../database/database');
const objectService = require('./../../service/object/objectService');

jest.setTimeout(20000);
describe('Object Service tests', () => {
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
    });

    afterAll( () => {
        testContainer.stop();
    } );

    it('Should list all Accounts', async () => {
        const retrieveData = await objectService.retrieve('account', '000-0406b4b9-8905-4b25-8136-e3b20e580a1e');
        expect(retrieveData.name).toBe('Account 1');
    });

    it('Should retrieve an Account', async () => {
        const retrieveData = await objectService.retrieve('account', '000-0406b4b9-8905-4b25-8136-e3b20e580a1e');
        expect(retrieveData.name).toBe('Account 1');
    });

    it('Should create an Account', async () => {
        const createData = await objectService.create('account', {
            name: 'Created Test Account',
            type: 'Default'
        });

        expect(createData.affectedRows).toBe(1);
    });

    it('Should update an Account', async () => {
        const updateData = await objectService.update('account', '000-0406b4b9-8905-4b25-8136-e3b20e580a1e', {
            name: 'Updated Test Account'
        });

        expect(updateData.affectedRows).toBe(1);
    });

    it('Should remove an Account', async () => {
        const updateData = await objectService.remove('account', '000-0406b4b9-8905-4b25-8136-e3b20e580a1e');
        expect(updateData.affectedRows).toBe(1);
    });
})



