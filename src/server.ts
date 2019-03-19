import './common/extensions'
// tslint:disable-next-line
import mongoose from 'mongoose'
import App from './app'

mongoose.connect(process.env.DB_URL, {
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
const PORT = process.env.PORT || 3000

expressApp.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Listening on port ${PORT}`)
  // tslint:disable-next-line
  console.log(`App url: http://localhost:${PORT}/`)
})
