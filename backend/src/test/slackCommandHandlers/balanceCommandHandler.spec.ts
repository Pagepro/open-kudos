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

    expect(balanceInformation).to.be.equal(`Here is your Kudos balance\n\n*Kudos to Give*\n50 Kudos\nThese are Kudos you can give to your teammates and are reset at the beginning of the month.\n\n*Kudos to Spend*\n20 Kudos \nYou receive these Kudos from your teammates and can spend them to buy gifts. They never expire.`)
  })
})
