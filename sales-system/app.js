const express = require('express');
const cors = require('cors');

const objectRoute = require('./routes/object')
const layoutRoute = require('./routes/layout')
const relationRoute = require('./routes/relation')
const objectDefinerRoute = require('./routes/objectDefiner');
const clientRoute = require('./routes/client/client');

const appLoader = require('./appLoader');
const app = express();

appLoader.initializeApp()
    .then( () => {
        console.info('[SALES SYSTEM] App loaded.');
        app.listen(19061, () => console.log('[SALES SYSTEM] Listening...'));
    });

app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/object', objectRoute);
app.use('/layout', layoutRoute);
app.use('/relation', relationRoute);
app.use('/define', objectDefinerRoute);
app.use('/client', clientRoute);
