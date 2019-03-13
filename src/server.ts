
// import app from './config/express'
// import database from './config/mongodb'
// import { setCronTask } from './services/kudos'
// const port = process.env.PORT

// database().then(dbClient => {
//     app.locals.db = dbClient
//     app.listen(port, () => console.log(`App listening on port ${port}!`))
//     setCronTask()
// }).catch((err) => {
//     console.log(err)
// })

import './common/extensions'
// tslint:disable-next-line
import App from './app'
import mongoose from 'mongoose'

mongoose.connect(process.env.DB_NAME)
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
