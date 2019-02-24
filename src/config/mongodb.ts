import { MongoClient, Db } from 'mongodb';
import { Subject } from 'rxjs'
// import User from '../models/user'

const subject = new Subject();
const mongoClientOptions = { promiseLibrary: Promise, useNewUrlParser: true }
MongoClient.connect(process.env.DB_URL, mongoClientOptions, (err, client) => {
    if (err) {
        subject.error(err.stack)
        console.warn(`Failed to connect to the database. ${err.stack}`)
    }
    subject.next(client.db(process.env.DB_NAME))
    subject.complete()
});

// example for seeding
// subject.subscribe({
//     next: (dbClient: Db) => {
//         dbClient.collection('users').insertOne(new User())
//     }
// })
export default subject