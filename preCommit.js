const chalk = require('chalk')

const { IS_GIT_CZ } = process.env

if (!IS_GIT_CZ) {
  console.log(chalk.yellow.bgRed.bold('Please run (yarn run git-cz) to make valid commit.'))
  process.exitCode = 1
}
