const express = require('express');
const app = express();
const os = require('os');

const bodyParser = require('body-parser');

// env parser
require('dotenv').load();

// work with git
const git = require('nodegit');

const { verifyGithub } = require('./util');

// For parsing github json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello world");
})

const homeDir = os.homedir();
const pathToRepo = `${homeDir}/ramsgoli.github.io`;
const pathToMakefile = `${homeDir}/ramsgoli.github.io/Makefile`;

app.post('/', (req, res) => {
    if (verifyGithub(req)) {

        // merge origin/master into our local master branch
        git.Repository.open(pathToRepo).then(repo => {
            return repo.fetchAll();
        }).then(() => {
            return repo.mergeBranches("master", "origin/master");
        });

        // make new images and run
        return res.status(200).end();
    } else {
        return res.status(401).end();
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000..");
});
