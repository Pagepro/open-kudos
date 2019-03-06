
import app from './config/express'
import database from './config/mongodb'
import { setCronTask } from './services/kudos'
const port = process.env.PORT

database().then(dbClient => {
    app.locals.db = dbClient
    app.listen(port, () => console.log(`App listening on port ${port}!`))
    setCronTask()
}).catch((err) => {
    console.log(err)
})

