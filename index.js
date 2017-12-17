const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// env parser
require('dotenv').config();

// GIT
const git = require('nodegit');

// For parsing github json
app.use(bodyParser.json());

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200);
});

app.listen(3000, () => {
    console.log("Listening on port 3000..");
});
