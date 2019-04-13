/* tslint:disable */
import DbService from '../common/services/db'
import User from '../models/user.model'
import Gift from '../models/gift.model'
import {
  testUserData,
  testReceiverData,
  gifts,
  testTeamId,
  testBuyerUserData
} from './testData'
const db = new DbService()
const giftsWithTeamId = gifts.map(gift => ({ ...gift, teamId: testTeamId }))

before(async () => {
  db.connect()
  await User.insertMany([testUserData, testReceiverData, testBuyerUserData])
  await Gift.insertMany(giftsWithTeamId)
})

after(async () => {
  await User.deleteMany({})
  await Gift.deleteMany({})
  db.disconnect()
})
