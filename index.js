const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// env parser
require('dotenv').load();

const { verifyGithub } = require('./util');

// For parsing github json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.post('/', (req, res) => {
    if (verifyGithub(req)) {
        return res.status(200).end();
    } else {
        return res.status(401).end();
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000..");
});
