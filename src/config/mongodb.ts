import { MongoClient, Db } from 'mongodb';
import { Subject } from 'rxjs'

const connect = new Subject();
const mongoClientOptions = { promiseLibrary: Promise, useNewUrlParser: true }
MongoClient.connect(process.env.DB_URL, mongoClientOptions, (err, client) => {
    if (err) {
        connect.error(err.stack)
        console.warn(`Failed to connect to the database. ${err.stack}`)
    }
    connect.next(client.db(process.env.DB_NAME))
    connect.complete()
})

export default connect