/* tslint:disable */
import * as chai from 'chai'
import GiveCommandHandler from '../../common/slackCommandHandlers/giveSlackCommandHandler'
import { ISlackEventInfo } from '../../controllers/definitions/slackController'
import TestHelper from '../../utils/testHelper'
import { slackEventBasicObject } from '../testData';
import chaiAsPromised from 'chai-as-promised'

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
})
