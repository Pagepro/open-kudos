const fs = require('fs-extra');
const logger = require('heroku-logger')

fs.copy(`${__dirname}/src/views/`, `${__dirname}/dist/views/`, error => {
  if (error) {
    logger.error(error)
  }
});
