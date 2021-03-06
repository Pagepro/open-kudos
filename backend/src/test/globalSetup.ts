import { MongoMemoryServer } from 'mongodb-memory-server'
import DbService from '../common/services/db'
import Gift from '../models/gift.model'
import User from '../models/user.model'
import {
  testBuyerUserData,
  testGifts,
  testReceiverData,
  testTeamId,
  testUserData,
} from './testData'

const globalSetup = async () => {
  const mongod = new MongoMemoryServer()
  const testMongoUrl = await mongod.getConnectionString()
  process.env.DB_CONNECTION_STRING = testMongoUrl
  const db = new DbService()
  const giftsWithTeamId = testGifts.map(gift => ({
    ...gift,
    teamId: testTeamId
  }))
  db.connect()
  await User.insertMany([testUserData, testReceiverData, testBuyerUserData])
  await Gift.insertMany(giftsWithTeamId)
  db.disconnect()
  // @ts-ignore
  global.__MONGOD__ = mongod
}

export default globalSetup
