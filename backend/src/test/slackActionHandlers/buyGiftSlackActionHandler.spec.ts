import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import BuyGiftSlackActionHandler from '../../common/slackActionHandlers/buyGiftSlackActionHandler'
import { ISlackAction } from '../../controllers/definitions/slackController'
import Gift, { IGiftDocument } from '../../models/gift.model'
import User from '../../models/user.model'
import TestHelper from '../../utils/testHelper'
import {
  coffeeGiftIndex,
  gameGiftIndex,
  monopolyGiftIndex,
  mugGiftIndex,
  slackActionBasic,
  testBuyerUserData
} from '../testData'

class BuyGiftSlackActionHandlerToTest extends BuyGiftSlackActionHandler {
  public async validate() {
    await super.validate()
  }
}

chai.use(chaiAsPromised)
const { expect } = chai
const testHelper = new TestHelper<ISlackAction>()
let gifts: IGiftDocument[]

function getAllTestGifts() {
  return Gift.find({})
}

describe('BuyGiftSlackActionHandler tests', () => {
  before(async () => {
    gifts = await getAllTestGifts()
  })

  it('BuyGiftSlackActionHandler should decrease the amount of users kudos',
    async () => {
      const coffee = gifts[coffeeGiftIndex]
      const slackActionWithGame = testHelper.createTestObject(
        slackActionBasic,
        {
          actions: [{ name: coffee.name, type: "button", value: coffee.id }],
          user: { id: testBuyerUserData.userId }
        }
      )
      const buyGifActionHandler =
        new BuyGiftSlackActionHandlerToTest(slackActionWithGame)

      await buyGifActionHandler.handleAction()
      const buyer = await User.findOne({
        teamId: testBuyerUserData.teamId,
        userId: testBuyerUserData.userId,
      })
      expect(buyer.kudosSpendable).to.be.equal(100)
    }
  )

  it('BuyGiftSlackActionHandler should decrease the amount of bought gift',
    async () => {
      const game = gifts[gameGiftIndex]
      const slackActionWithGame = testHelper.createTestObject(
        slackActionBasic,
        {
          actions: [{ name: game.name, type: "button", value: game.id }],
          user: { id: testBuyerUserData.userId }
        }
      )
      const buyGifActionHandler =
        new BuyGiftSlackActionHandlerToTest(slackActionWithGame)

      await buyGifActionHandler.handleAction()
      const gameGift = await Gift.findOne({ _id: game.id, teamId: game.teamId })
      expect(gameGift.amount).to.be.equal(9)
    }
  )

  it('should throw error if there is not enough kudos to buy',
    async () => {
      const monopoly = gifts[monopolyGiftIndex]
      const slackActionWithMonopoly = testHelper.createTestObject(
        slackActionBasic,
        {
          actions: [
            {
              name: monopoly.name,
              type: "button",
              value: monopoly.id
            }
          ],
          user: {
            id: testBuyerUserData.userId
          }
        }
      )

      const giveCommandHandler =
        new BuyGiftSlackActionHandlerToTest(slackActionWithMonopoly)

      return await expect(giveCommandHandler.validate()).to.be.rejectedWith(
        // tslint:disable-next-line: max-line-length
        `You don't have enough kudos to buy a gift or the gift is out of stock :(`
      )
    }
  )

  it('should throw error if the gift is not in stock',
    async () => {
      const mug = gifts[mugGiftIndex]
      const slackActionWithMug = testHelper.createTestObject(
        slackActionBasic,
        {
          actions: [{ name: mug.name, type: "button", value: mug.id }],
          user: { id: testBuyerUserData.userId }
        }
      )

      const giveCommandHandler =
      new BuyGiftSlackActionHandlerToTest(slackActionWithMug)
      return await expect(giveCommandHandler.validate()).to.be.rejectedWith(
        // tslint:disable-next-line: max-line-length
        `You don't have enough kudos to buy a gift or the gift is out of stock :(`
      )
    }
  )
})
