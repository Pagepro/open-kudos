/* tslint:disable */
import * as chai from 'chai'
import GiveCommandHandler from '../../common/slackCommandHandlers/giveSlackCommandHandler'
import { ISlackEventInfo } from '../../controllers/definitions/slackController'
import TestHelper from '../../utils/testHelper'
import {
  slackEventBasicObject,
  testUserData,
  testReceiverData,
  newUserForGiveCommandData,
  newReceiverForGiveCommandData
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
const testHelper = new TestHelper<ISlackEventInfo>()

const slackEventInfoFromUserWithFullCommand = testHelper.createTestObject(
  slackEventBasicObject,
  { event: { text: '<@U0LAN0Z10> give <@U0LAN0Z99> 10 for test purpose' } }
)

const slackEventInfoFromUserWithoutReasonOfGivignPoints = testHelper.createTestObject(
  slackEventBasicObject,
  { event: { text: '<@U061F7AUR> give <@U0LAN0Z99> 10' } }
)

const slackEventInfoFromUserWithReceiverEqualGiver = testHelper.createTestObject(
  slackEventBasicObject,
  { event: { text: '<@U061F7AUR> give <@U061F7AUR> 10 for test purpose' } }
)

const slackEventInfoFromUserWithNotValidPointsAmount = testHelper.createTestObject(
  slackEventBasicObject,
  { event: { text: '<@U061F7AUR> give <@U0LAN0Z99> XYZ for test purpose' } }
)

const slackEventInfoFromUserWithNotValidRecievier = testHelper.createTestObject(
  slackEventBasicObject,
  { event: { text: '<@U061F7AUR> give notValidUser 10 for test purpose' } }
)

const slackEventInfoWithValidData = testHelper.createTestObject(
  slackEventBasicObject,
  {
    event:
    {
      user: testUserData.userId,
      text: `<@U061F7AUR> give <@${testReceiverData.userId}> 10 for test purpose`
    }
  }
)

const slackEventInfoWithNewUser = testHelper.createTestObject(
  slackEventBasicObject,
  {
    event:
    {
      user: newUserForGiveCommandData.userId,
      text: `<@U061F7AUR> give <@${testReceiverData.userId}> 10 for being kind for me at first day of my work`
    }
  }
)

const slackEventInfoWithReceiverAddedRecentlyData = testHelper.createTestObject(
  slackEventBasicObject,
  {
    event:
    {
      user: testUserData.userId,
      text: `<@U061F7AUR> give <@${newReceiverForGiveCommandData.userId}> 10 for test purpose`
    }
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

  it('giveCommandHandler should add points even if user was added after the app installation', async () => {
    const giveCommandHandler = new GiveCommandHandlerToTest(slackEventInfoWithNewUser)
    await giveCommandHandler.handleCommand()
    const newUser = await User.findOne({
      userId: newUserForGiveCommandData.userId,
      teamId: newUserForGiveCommandData.teamId
    })

    expect(newUser.id).to.be.a('string').that.is.not.empty
  })

  it('giveCommandHandler should add points for recently added receiver', async () => {
    const giveCommandHandler = new GiveCommandHandlerToTest(slackEventInfoWithReceiverAddedRecentlyData)
    await giveCommandHandler.handleCommand()
    const allUsers = await User.find({})
    const receiver = await User.findOne({ userId: newReceiverForGiveCommandData.userId })

    expect(receiver.kudosSpendable).to.be.equal(10)
  })
})
