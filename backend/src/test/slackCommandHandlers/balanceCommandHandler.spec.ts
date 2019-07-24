import { expect } from 'chai'
import BalanceCommandHandler from '../../common/slackCommandHandlers/balanceSlackCommandHandler'
import { ISlackCommandInfo } from '../../controllers/definitions/slackController'
import { slackCommandBasicObject } from '../testData'
import TestHelper from '../testHelper'

const testHelper = new TestHelper<ISlackCommandInfo>()
const getBalanceCommand = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'balance' }
)

describe('BalanceCommandHandler tests', () => {
  it(`getBalanceInformation should return info about the users kudos balance`,
    async () => {
      const balanceCommandHandler = new BalanceCommandHandler(getBalanceCommand)
      const balanceInformation =
        await balanceCommandHandler.getBalanceInformation()

      expect(balanceInformation).to.be.equal(
        // tslint:disable-next-line: max-line-length
        `Here is your Kudos balance\n\n*Kudos to Give*\n50 Kudos\nThese are Kudos you can give to your teammates and are reset at the beginning of the month.\n\n*Kudos to Spend*\n20 Kudos \nYou receive these Kudos from your teammates and can spend them to buy gifts. They never expire.`
      )
    }
  )
})
