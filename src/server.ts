
import app from './config/express'
import connect from './config/mongodb'
import { setCronTask } from './services/kudos';
const port = process.env.PORT

connect.subscribe({
    next: (dbClient => {
        app.locals.db = dbClient
        app.listen(port, () => console.log(`App listening on port ${port}!`))
        setCronTask()
    }),
    error: (err) => {
        console.log(err)
    }
})
