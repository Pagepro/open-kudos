/* tslint:disable */
import { expect } from 'chai'
import TestHelper from '../testHelper'
import User from '../../models/user.model'
import DbService from '../../common/services/db'
import { ISlackEventInfo } from '../../controllers/definitions/slackController'
import BalanceCommandHandler from '../../common/slackCommandHandlers/balanceSlackCommandHandler'
import { slackEventBasicObject, testUserData } from '../testData';

const testHelper = new TestHelper<ISlackEventInfo>()
const slackEventInfoFromUserWithFullCommand = testHelper.createTestObject(
  slackEventBasicObject,
  { event: { text: '@kudos balance' } }
)
const db = new DbService()

describe('BalanceCommandHandler tests', () => {
  before(async () => {
    db.connect()

    await User.create(testUserData)
  })

  it(`getBalanceInformation should return full information about the users kudos' balance`, async () => {
    const balanceCommandHandler = new BalanceCommandHandler(slackEventInfoFromUserWithFullCommand)
    const balanceInformation = await balanceCommandHandler.getBalanceInformation()
    expect(balanceInformation).to.be.equal(`Here is your current balance \n\n*Giveable Balance*\n50 Kudos\nGiveable balances reset at the beginning of the month. Use 'em or lose 'em\n\n*Spendable Balance*\n20 Kudos \nSpendable Kudos never expire. Use them to buy cool things in the store`)
  })

  after(async () => {
    await User.deleteMany({})
    db.disconnect()
  })
})
