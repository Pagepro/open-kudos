/* tslint:disable */
import DbService from '../common/services/db'
import User from '../models/user.model'
import { testUserData, testReceiverData } from './testData'
const db = new DbService()

before(async () => {
  db.connect()
  await User.insertMany([testUserData, testReceiverData])
})

after(async () => {
  await User.deleteMany({})
  db.disconnect()
})
