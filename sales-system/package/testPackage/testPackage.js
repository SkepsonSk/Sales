const Package = require('@package/package')

module.exports = class TestPackage extends Package {

    init() {
        console.log('Initialized...');
    }

}
