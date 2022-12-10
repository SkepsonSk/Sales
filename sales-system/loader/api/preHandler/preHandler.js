module.exports = class PreHandler {

    shouldHandle(req, res, route){
        return true;
    }

    async handle(req, res, route) {
        return true;
    }

}
