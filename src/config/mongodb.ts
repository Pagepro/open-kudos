import { MongoClient, Db, Collection } from 'mongodb'
import { initWorkspaces } from '../services/db/workspace'
import { initTranslations } from '../services/db/translations'

export interface CustomDb extends Db {
    workspaceCollection?: (workspaceName: string, collection: string) => Collection,
    workspaces?: any
}
let db: CustomDb
const mongoClientOptions = { promiseLibrary: Promise, useNewUrlParser: true }
let subscribers: any[] = []
let isConnecting = false

function connectMongo(dbURL: string = process.env.DB_URL, options: {} = mongoClientOptions) {
    if (!isConnecting) {
        isConnecting = true
        MongoClient.connect(dbURL, options, (err, client) => {
            if (err) {
                console.warn(`Failed to connect to the database. ${err.stack}`)
                subscribers = subscribers.filter(([res, rej]: [Function, Function]) => {
                    rej(err.stack)
                })
                isConnecting = false
            } else {
                db = client.db(process.env.DB_NAME)
                db.workspaces = {}
                db.workspaceCollection = (workspaceName: string, collection: string): Collection => {
                    return db.collection(`${workspaceName}_${collection}`)
                }
                subscribers = subscribers.filter(([res, rej]: [Function, Function]) => {
                    res(db)
                })
                initWorkspaces()
                initTranslations()
            }
        })
    }
}
export const database = function(): Promise<CustomDb> {
    return new Promise((res, rej) => {
        if (db) {
            res(db)
        } else if (!isConnecting) {
            connectMongo()
        }
        subscribers.push([res, rej])
    })
}
export default database
