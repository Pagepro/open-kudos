import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import GiveCommandHandler from '../../common/slackCommandHandlers/giveSlackCommandHandler'
import { ISlackCommandInfo } from '../../controllers/definitions/slackController'
import User from '../../models/user.model'
import TestHelper from '../../utils/testHelper'
import {
  slackCommandBasicObject,
  testReceiverData,
  testUserData
} from '../testData'

class GiveCommandHandlerToTest extends GiveCommandHandler {
  public async validate() {
    await super.validate()
  }
}

chai.use(chaiAsPromised)
const { expect } = chai
const testHelper = new TestHelper<ISlackCommandInfo>()

const giveKudosCommand = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'give <@U0LAN0Z99|test> 10 for test purpose' }
)

const giveKudosNoReasonCommand = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'give <@U0LAN0Z99|test> 10' }
)

const giveKudosMyselfCommand = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'give <@U061F7AUR|test> 10 for test purpose' }
)

const giveKudosInvalidValueCommand = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'give <@U0LAN0Z99|test> XYZ for test purpose' }
)

const giveKudosInvalidReceiverCommand = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'give notValidUser 10 for test purpose' }
)

const giveKudosWithValidDataCommand = testHelper.createTestObject(
  slackCommandBasicObject,
  {
    text: `give <@${testReceiverData.userId}|test> 10 for test purpose`,
    user_id: testUserData.userId
  }
)

describe('GiveCommandHandler tests', () => {
  it('should return specified reason for giving kudos', () => {
    const giveCommandHandler = new GiveCommandHandlerToTest(giveKudosCommand)
    const informationWhyUserGetsPoints = giveCommandHandler.transactionComment

    expect(informationWhyUserGetsPoints).to.be.equal('for test purpose')
  })

  it('should return basic reason for giving kudos', () => {
      const giveCommandHandler =
        new GiveCommandHandlerToTest(giveKudosNoReasonCommand)

      const validMessage = giveCommandHandler.transactionComment

      expect(validMessage).to.be.equal(`for no reason`)
    }
  )

  it('should throw error if sender equals receiver', async () => {
    const giveCommandHandler =
      new GiveCommandHandlerToTest(giveKudosMyselfCommand)

    return await expect(giveCommandHandler.validate())
      .to
      .be
      .rejectedWith('You cant add points for yourself :(')
  })

  it('should throw error if points amount is invalid', async () => {
    const giveCommandHandler =
      new GiveCommandHandlerToTest(giveKudosInvalidValueCommand)

    return await expect(
      giveCommandHandler.validate()
    ).to.be.rejectedWith(
      'You tried to give XYZ but this is not valid amount of points :('
    )
  })

  it('should throw error if receiver username is invalid', async () => {
    const giveCommandHandler =
      new GiveCommandHandlerToTest(giveKudosInvalidReceiverCommand)

    return await expect(giveCommandHandler.validate())
      .to
      .be
      .rejectedWith(`Couldn't find the person you wanted to give points to :(`)
  })

  it('giveCommandHandler should add points for receiver', async () => {
    const giveCommandHandler =
      new GiveCommandHandlerToTest(giveKudosWithValidDataCommand)

    await giveCommandHandler.handleCommand()
    const receiver = await User.findOne({ userId: testReceiverData.userId })

    expect(receiver.kudosSpendable).to.be.equal(30)
  })

  it('giveCommandHandler should response with proper information', async () => {
    const giveCommandHandler =
      new GiveCommandHandlerToTest(giveKudosWithValidDataCommand)

    const message = giveCommandHandler.getCommandResponse()

    expect(message).to.be.equal(
      // tslint:disable-next-line: max-line-length
      '<@U072A8BOG> just received *10* kudos from <@U061F7AUR> for test purpose.'
    )
  })
})
