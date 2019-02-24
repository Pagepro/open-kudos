
import app from './config/express'
import db from './config/mongodb'
const port = process.env.PORT

db.subscribe({
    next: (dbClient => {
        app.locals.db = dbClient
        app.listen(port, () => console.log(`App listening on port ${port}!`))
    }),
    error: (err) => {
        console.log(err)
    }
})
