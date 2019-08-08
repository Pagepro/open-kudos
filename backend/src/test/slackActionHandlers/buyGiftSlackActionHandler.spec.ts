import DbService from '../../common/services/db'
import BuyGiftSlackActionHandler from '../../common/slackActionHandlers/buyGiftSlackActionHandler'
import { ISlackActionBlock } from '../../controllers/definitions/slackController'
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

const testHelper = new TestHelper<ISlackActionBlock>()

jest.mock('../../common/services/slackClient', () => {
  return jest.fn().mockImplementation(() => {
    return { sendMessage: () => Promise.resolve() }
  })
})

describe('BuyGiftSlackActionHandler tests', () => {
  let gifts: IGiftDocument[]
  let db: DbService

  beforeAll(async () => {
    db = new DbService()
    db.connect()
    gifts = await Gift.find({})
  })

  afterAll(() => {
    db.disconnect()
  })

  it('BuyGiftSlackActionHandler should decrease the amount of users kudos',
    async () => {
      const coffee = gifts[coffeeGiftIndex]
      const slackActionWithGame = testHelper.createTestObject(
        slackActionBasic,
        {
          actions: [{
            action_id: 'buyGift',
            block_id: 'MvE',
            text: {},
            value: coffee.id,
            type: 'button',
            action_ts: '1565185476.998286'
          }],
          user: { id: testBuyerUserData.userId }
        }
      )
      const buyGifActionHandler =
        new BuyGiftSlackActionHandlerToTest(slackActionWithGame)

      await buyGifActionHandler.handleAction()
      const user = await User.findOne({
        teamId: testBuyerUserData.teamId,
        userId: testBuyerUserData.userId,
      })
      expect(user.kudosSpendable).toEqual(100)
    }
  )

  it('BuyGiftSlackActionHandler should decrease the amount of bought gift',
    done => {
      const game = gifts[gameGiftIndex]
      const slackActionWithGame = testHelper.createTestObject(
        slackActionBasic,
        {
          actions: [{
            action_id: 'buyGift',
            block_id: 'MvE',
            text: {},
            value: game.id,
            type: 'button',
            action_ts: '1565185476.998286'
          }],
          user: { id: testBuyerUserData.userId }
        }
      )
      const buyGifActionHandler =
        new BuyGiftSlackActionHandlerToTest(slackActionWithGame)

      buyGifActionHandler.handleAction().then(() => {
        Gift.findOne({
          _id: game.id,
          teamId: game.teamId
        }).then(gift => {
          expect(gift.amount).toEqual(9)
          done()
        })
      })
    }
  )

  it('should throw error if there is not enough kudos to buy',
    async () => {
      const monopoly = gifts[monopolyGiftIndex]
      const slackActionWithMonopoly = testHelper.createTestObject(
        slackActionBasic,
        {
          actions: [{
            action_id: 'buyGift',
            block_id: 'MvE',
            text: {},
            value: monopoly.id,
            type: 'button',
            action_ts: '1565185476.998286'
          }],
          user: {
            id: testBuyerUserData.userId
          }
        }
      )

      const giveCommandHandler =
        new BuyGiftSlackActionHandlerToTest(slackActionWithMonopoly)

      expect(giveCommandHandler.validate()).rejects.toThrowError(
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
          // actions: [{ name: mug.name, type: "button", value: mug.id }],
          actions: [{
            action_id: 'buyGift',
            block_id: 'MvE',
            text: {},
            value: mug.id,
            type: 'button',
            action_ts: '1565185476.998286'
          }],
          user: { id: testBuyerUserData.userId }
        }
      )

      const giveCommandHandler =
        new BuyGiftSlackActionHandlerToTest(slackActionWithMug)
      return await expect(giveCommandHandler.validate()).rejects.toThrowError(
        // tslint:disable-next-line: max-line-length
        `You don't have enough kudos to buy a gift or the gift is out of stock :(`
      )
    }
  )
})
