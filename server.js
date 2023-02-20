import chalk from 'chalk';

const log = console.log;

const express = require('express');
const PORT = process.env.PORT || 1337;
const app = express();

console.log(chalk.blue('Hello world!'));

log(chalk.blue('Hello') + ' World' + chalk.red('!'));

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500');

app.get('/', onHome).listen(1337);

function onHome(req, res) {
    res.send('hallo')
};
