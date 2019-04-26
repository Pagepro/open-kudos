const shellHistory = require('shell-history');
const chalk = require('chalk');
const log = console.log;
const history = shellHistory()
const lastCommand = history[history.length - 1]

if (lastCommand.toLowerCase() !== 'yarn run git-cz') {
  log(chalk.yellow.bgRed.bold('Please run (yarn run git-cz) to make valid commit.'))
  process.exitCode = 1
}
