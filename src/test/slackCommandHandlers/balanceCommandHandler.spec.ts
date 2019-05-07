/* tslint:disable */
import { expect } from 'chai'
import TestHelper from '../testHelper'
import { ISlackCommandInfo } from '../../controllers/definitions/slackController'
import BalanceCommandHandler from '../../common/slackCommandHandlers/balanceSlackCommandHandler'
import { slackCommandBasicObject } from '../testData';

const testHelper = new TestHelper<ISlackCommandInfo>()
const slackEventInfoFromUserWithFullCommand = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'balance' }
)

describe('BalanceCommandHandler tests', () => {
  it(`getBalanceInformation should return full information about the users kudos' balance`, async () => {
    const balanceCommandHandler = new BalanceCommandHandler(slackEventInfoFromUserWithFullCommand)
    const balanceInformation = await balanceCommandHandler.getBalanceInformation()
    expect(balanceInformation).to.be.equal(`Here is your current balance \n\n*Giveable Balance*\n50 Kudos\nGiveable balances reset at the beginning of the month. Use 'em or lose 'em\n\n*Spendable Balance*\n20 Kudos \nSpendable Kudos never expire. Use them to buy cool things in the store`)
  })
})
