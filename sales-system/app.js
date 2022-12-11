require('module-alias/register');

const express = require('express');
const cors = require('cors');

const userRouter = require('@route/user');
const objectRoute = require('@route/object');
const searchRoute = require('@route/search');
const layoutRoute = require('@route/layout');
const relationRoute = require('@route/relation');
const pathRoute = require('@route/path');
const objectDefinerRoute = require('@route/objectDefiner');
const exportingRouter = require('@route/exporting');
const clientRoute = require('@route/client/client');

const appLoader = require('@appLoader');
const app = express();

appLoader.initializeApp(app)
    .then( () => {
        console.info('[SALES SYSTEM] App loaded.');
        app.listen(process.env.PORT || 19061, () => {
            const arguments = process.argv;

            console.log('[SALES SYSTEM] Listening...');
            if (arguments.includes('--stop')) {
                console.log('[SALES SYSTEM] Requested stop...');
                process.exit();
            }
        });
    });

const dashboardServer = process.env.DASHBOARD_URL || 'http://localhost:4200';
app.use(cors({ origin: dashboardServer, optionsSuccessStatus: 200 }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/user', userRouter);
app.use('/object', objectRoute);
app.use('/search', searchRoute);
app.use('/layout', layoutRoute);
app.use('/relation', relationRoute);
app.use('/path', pathRoute);
app.use('/define', objectDefinerRoute);
app.use('/export', exportingRouter);
app.use('/client', clientRoute);
