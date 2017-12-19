const express = require('express');
const util = require('util');
const cp = require('child_process');

const os = require('os');

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

const homeDir = os.homedir();
const pathToRepo = `${homeDir}/ramsgoli.github.io`;
const pathToMakefile = `${homeDir}/ramsgoli.github.io/Makefile`;

const exec = util.promisify(cp.exec);

app.post('/', (req, res) => {
    if (verifyGithub(req)) {

    // merge origin/master into our local master branch
        res.status(200).end();
		try {
			process.chdir(pathToRepo);
		} catch(err) {
			// well shit
			console.error("Could not change directory: " + err);
            return;
		}

		exec('docker-compose down').then((stdout) => {
			console.log(stdout);
			return exec('git pull');
		}).then(stdout => {
			console.log(stdout);
			return exec('make build_image');
		}).then(stdout => {
			console.log(stdout);
			return exec('make run');
		}).then(stdout => {
			console.log(stdout);
		}).catch(err => {
			console.error(err);		
		});
		
    } else {
		return res.status(401).end();
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000..");
});
