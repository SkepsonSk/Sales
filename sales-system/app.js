const express = require('express');
const cors = require('cors');

const objectRoute = require('./routes/object');
const layoutRoute = require('./routes/layout');
const relationRoute = require('./routes/relation');
const pathRoute = require('./routes/path');
const objectDefinerRoute = require('./routes/objectDefiner');
const clientRoute = require('./routes/client/client');

const appLoader = require('./appLoader');
const app = express();

appLoader.initializeApp()
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
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', dashboardServer);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', true);

    next();
}

//app.use(cors({ origin: dashboardServer, optionsSuccessStatus: 200 }));
app.use(allowCrossDomain);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/object', objectRoute);
app.use('/layout', layoutRoute);
app.use('/relation', relationRoute);
app.use('/path', pathRoute);
app.use('/define', objectDefinerRoute);
app.use('/client', clientRoute);
