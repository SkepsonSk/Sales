const PreHandler = require('./preHandler');

const authorizationService = require('@service/object/authorizationService');

module.exports = class AuthorizationPreHandler extends PreHandler {

    shouldHandle(req, res, route) {
        return route.access != null && route.access.authorized;
    }

    async handle(req, res, route) {
        const token = req.header('Authorization');

        try {
            await authorizationService.userInfo(token);
        } catch (e) {
            res.status(401).json({
                message: e.message
            });
            return false;
        }

        return true;
    }

}
