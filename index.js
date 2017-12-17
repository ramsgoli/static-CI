const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// env parser
require('dotenv').config();

// For parsing github json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.post('/', (req, res) => {
    res.status(200);
});

app.listen(3000, () => {
    console.log("Listening on port 3000..");
});
