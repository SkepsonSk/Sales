const RouteHandler = require('./../../loader/api/handler/routeHandler');

module.exports = class HelloRouteHandler extends RouteHandler {

    getRoutes() {
        return {
            helloTest: async (req, res) => {
                res.json({
                    message: 'hello'
                });
            }
        }
    }
}
