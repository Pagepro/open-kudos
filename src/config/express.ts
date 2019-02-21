import express from 'express'
import bodyParser from 'body-parser'
import { router } from '../routes/router'
import { MongoClient } from 'mongodb';

const mongoClientOptions = { promiseLibrary: Promise, useNewUrlParser: true }
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router)

MongoClient.connect(process.env.DB_URL, mongoClientOptions, (err, client) => {
    if (err) {
        console.warn(`Failed to connect to the database. ${err.stack}`)
    }
    app.locals.db = client.db(process.env.DB_NAME)
});

export default app;
