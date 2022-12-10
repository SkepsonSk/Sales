const PreHandler = require('./preHandler');

const authorizationService = require('./../../../service/object/authorizationService');

module.exports = class AuthorizationPreHandler extends PreHandler {

    shouldHandle(req, res, route) {
        return route.access != null && route.access.permitted != null;
    }

    async handle(req, res, route) {
        const token = req.header('Authorization');

        try {
            await authorizationService.permitted(route.access.permitted, token);
        } catch (e) {
            res.status(403).json({
                message: e.message
            });
            return false;
        }

        return true;
    }
}
