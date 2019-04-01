const prepare = require('mocha-prepare')
const mongoUnit = require('mongo-unit')

prepare(done => mongoUnit.start()
  .then(testMongoUrl => {
    process.env.DB_CONNECTION_STRING = testMongoUrl
    done()
  }))
