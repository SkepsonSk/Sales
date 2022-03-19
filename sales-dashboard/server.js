const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/sales-dev-dashboard'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/<app-name>/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('[SALES DASHBOARD] Listening...');
});
