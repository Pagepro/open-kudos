import mongoose from 'mongoose'
import Config from '../consts/config'

export default class DbService {
  public connect() {
    mongoose.connect(Config.dbConnectionString, {
      autoIndex: false,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    })
    mongoose.Promise = global.Promise
    mongoose.connection.on('error', (err) => {
      // tslint:disable-next-line: no-console
      console.error(`🚫🚫🚫🚫🚫 → ${err.message}`)
    })
  }

  public disconnect() {
    mongoose.disconnect()
  }
}
