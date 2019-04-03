const prepare = require('mocha-prepare')
const mongoUnit = require('mongo-unit')

prepare(
  async (done) => {
    const testMongoUrl = await mongoUnit.start()
    process.env.DB_CONNECTION_STRING = testMongoUrl
    done()
  }
)
