const express = require('express');
const router = express.Router();

const metadata = require('@metadata/metadata');

const AuthorizationPreHandler = require('@loader/api/preHandler/authorizationPreHandler');
const PermittedPreHandler = require('@loader/api/preHandler/permittedPreHandler');

let PRE_HANDLERS = [];

const loadAPI = async (packageName, packageMetadata, app) => {
    console.info(`[${packageName}] [TRIGGER SYSTEM] Loading api...`);

    PRE_HANDLERS.push(new PermittedPreHandler());
    PRE_HANDLERS.push(new AuthorizationPreHandler());

    const apiRoutes = await metadata.read('apiRoutes.json', packageName);
    apiRoutes.forEach( route => {
        const handlerName = route.handler;
        const uri = route.uri;
        const handler = new (require(`@package/${packageName}/api/${handlerName}`));

        route.routes.forEach( subRoute => {
            const subURI = subRoute['uri'] != null ? subRoute['uri'] : '';
            router[subRoute.method](`${uri}/${subURI}`, async (req, res) => {
                await handleRequest(req, res, handler.getRoutes()[subRoute.name], subRoute);
            });
            console.log(`[${packageName}] [API SYSTEM] Loaded ${handlerName} for ${uri}`);
        } );
    } );

    app.use('/api', router);
    return Promise.resolve();
}

const handleRequest = async (req, res, handler, route) => {
    for (const preHandler of PRE_HANDLERS) {
        if (preHandler.shouldHandle(req, res, route)) {
            const ok = await preHandler.handle(req, res, route);

            if (!ok) {
                return;
            }
        }
    }

    try {
        await handler(req, res);
    } catch (e) {
        res.status(500).json(e);
    }
}

exports.loadAPI = loadAPI;
