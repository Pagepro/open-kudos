import mongoose from 'mongoose'
import Config from '../consts/config'

export default class DbService {
  public connect() {
    mongoose.connect(Config.dbConnectionString, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
    mongoose.Promise = global.Promise
    mongoose.connection.on('error', (err) => {
      // tslint:disable-next-line:no-console
      console.error(`🚫🚫🚫🚫🚫 → ${err.message}`)
    })
  }
}
