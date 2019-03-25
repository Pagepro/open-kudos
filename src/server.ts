import './common/extensions'
// tslint:disable-next-line
import mongoose from 'mongoose'
import App from './app'
import Config from './common/consts/config'


// TODO: move this connecion logic to app class
// or create separate service for db
mongoose.connect(Config.dbConnectionString, {
  useCreateIndex: true,
  useNewUrlParser: true
})
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
  // tslint:disable-next-line:no-console
  console.error(`🚫🚫🚫🚫🚫 → ${err.message}`)
})

const {
  expressApp
} = App
const PORT = Config.port || 3000

expressApp.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Listening on port ${PORT}`)
  // tslint:disable-next-line
  console.log(`App url: http://localhost:${PORT}/`)
})
