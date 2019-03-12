
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

const {
  expressApp
} = App
const PORT = process.env.PORT || 8080

expressApp.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Listening on port ${PORT}`)
  // tslint:disable-next-line
  console.log(`App url: http://localhost:${PORT}/`)
})
