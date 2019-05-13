/* tslint:disable */
import * as chai from 'chai'
import GiveCommandHandler from '../../common/slackCommandHandlers/giveSlackCommandHandler'
import { ISlackCommandInfo } from '../../controllers/definitions/slackController'
import TestHelper from '../../utils/testHelper'
import {
  slackCommandBasicObject,
  testUserData,
  testReceiverData
} from '../testData'
import chaiAsPromised from 'chai-as-promised'
import User from '../../models/user.model'

class GiveCommandHandlerToTest extends GiveCommandHandler {
  public async validate() {
    await super.validate()
  }
}

chai.use(chaiAsPromised)
const { expect } = chai
const testHelper = new TestHelper<ISlackCommandInfo>()

const slackEventInfoFromUserWithFullCommand = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'give <@U0LAN0Z99|test> 10 for test purpose' }
)

const slackEventInfoFromUserWithoutReasonOfGivignPoints = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'give <@U0LAN0Z99|test> 10' }
)

const slackEventInfoFromUserWithReceiverEqualGiver = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'give <@U061F7AUR|test> 10 for test purpose' }
)

const slackEventInfoFromUserWithNotValidPointsAmount = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'give <@U0LAN0Z99|test> XYZ for test purpose' }
)

const slackEventInfoFromUserWithNotValidRecievier = testHelper.createTestObject(
  slackCommandBasicObject,
  { text: 'give notValidUser 10 for test purpose' }
)

const slackEventInfoWithValidData = testHelper.createTestObject(
  slackCommandBasicObject,
  {
    user_id: testUserData.userId,
    text: `give <@${testReceiverData.userId}|test> 10 for test purpose`
  }
)

describe('GiveCommandHandler tests', function () {
  it('getInformationWhyUserGetsPoints should return full information about the reason for giving kudos', () => {
    const giveCommandHandler = new GiveCommandHandlerToTest(slackEventInfoFromUserWithFullCommand)
    const informationWhyUserGetsPoints = giveCommandHandler.transactionComment
    expect(informationWhyUserGetsPoints).to.be.equal('for test purpose')
  })

  it('getInformationWhyUserGetsPoints should return basic information about the reason for giving kudos', () => {
    const giveCommandHandler = new GiveCommandHandlerToTest(slackEventInfoFromUserWithoutReasonOfGivignPoints)
    const validMessage = giveCommandHandler.transactionComment
    expect(validMessage).to.be.equal(`for no reason`)
  })

  it('giveCommandHandler validation method should return error if sender === receiver', async () => {
    const giveCommandHandler = new GiveCommandHandlerToTest(slackEventInfoFromUserWithReceiverEqualGiver)

    return await expect(giveCommandHandler.validate())
      .to
      .be
      .rejectedWith('You cant add points for yourself :(');
  })

  it('giveCommandHandler validation method should return error if there is wrong point amount', async () => {
    const giveCommandHandler = new GiveCommandHandlerToTest(slackEventInfoFromUserWithNotValidPointsAmount)
    return await expect(giveCommandHandler.validate())
      .to
      .be
      .rejectedWith('You tried to give XYZ but this is not valid amount of points :(');
  })

  it('giveCommandHandler validation method should return error if there is wrong receiver username', async () => {
    const giveCommandHandler = new GiveCommandHandlerToTest(slackEventInfoFromUserWithNotValidRecievier)

    return await expect(giveCommandHandler.validate())
      .to
      .be
      .rejectedWith(`Couldn't find the person you wanted to give points to :(`);
  })

  it('giveCommandHandler should add points for receiver', async () => {
    const giveCommandHandler = new GiveCommandHandlerToTest(slackEventInfoWithValidData)
    await giveCommandHandler.handleCommand()
    const receiver = await User.findOne({ userId: testReceiverData.userId })

    expect(receiver.kudosSpendable).to.be.equal(30)
  })

  it('giveCommandHandler should response with proper information', async () => {
    const giveCommandHandler = new GiveCommandHandlerToTest(slackEventInfoWithValidData)
    const message = giveCommandHandler.getCommandResponse()

    expect(message).to.be.equal('<@U072A8BOG> just received *10* kudos from <@U061F7AUR> for test purpose.')
  })
})
