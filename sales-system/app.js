const express = require('express');
const cors = require('cors');

const database = require('./database/database')
const dataInitializer = require('./database/dataInitializer');

const objectRoute = require('./routes/object')

const app = express();

database.configure('localhost', 'root', '', 'sales');
dataInitializer.initialize();

app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/object', objectRoute);

app.listen(19061, () => console.log('[SALES SYSTEM] Listening...'));
