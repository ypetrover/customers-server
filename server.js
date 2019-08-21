const path = require('path');
const db = require('./server/db/db');
const cors = require('cors')
const express = require('express');
const app = express();
const routes = require('./server/routes/routes');
const port = 5588;
global.Application = app;

app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());

app.use(cors())
db.Open(app)
app.use(routes)

app.listen(port, () => {
   console.log('Listening on port: ' + port)
})