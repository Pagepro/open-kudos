import { expect } from 'chai'
import GiveCommandHandler from './giveCommandHandler'
import { ISlackEventInfo } from '../interfaces'

const slackEventBasicObject: ISlackEventInfo = {
    token: 'ZZZZZZWSxiZZZ2yIvs3peJ',
    team_id: 'T061EG9R6',
    api_app_id: 'A0MDYCDME',
    event: {
        type: 'app_mention',
        user: 'U061F7AUR',
        text: '',
        ts: '1515449438.000011',
        channel: 'C0LAN2Q65',
        event_ts: '1515449438000011'
    },
    type: 'event_callback',
    event_id: 'Ev0MDYGDKJ',
    event_time: 1515449438000011,
    authed_users: [
        'U0LAN0Z89'
    ]
}

const fullCommand = '<@U0LAN0Z10> give <@U0LAN0Z99> 10 for test purpose'
const commandWithoutReasonOfGivingPoints = '<@U061F7AUR> give <@U0LAN0Z99> 10'
const commandWithReceiverEqualGiver = '<@U061F7AUR> give <@U061F7AUR> 10 for test purpose'
const commandWithNotValidPointsAmount = '<@U061F7AUR> give <@U0LAN0Z99> XYZ for test purpose'
const commandWithNotValidReceiver = '<@U061F7AUR> give notValidUser 10 for test purpose'

describe('GiveCommandHandler tests', function () {
    it('getInformationWhyUserGetsPoints should return full information about the reason for giving kudos', () => {
        slackEventBasicObject.event.text = fullCommand
        const slackEventInfoFromUserWithFullCommand = slackEventBasicObject
        const giveCommandHandler = new GiveCommandHandler(slackEventInfoFromUserWithFullCommand)
        const validMessage = giveCommandHandler.getInformationWhyUserGetsPoints()
        expect(validMessage).to.be.equal('<@U061F7AUR> give <@U0LAN0Z99> 10 for test purpose')
    })

    it('getInformationWhyUserGetsPoints should return basic information about the reason for giving kudos', () => {
        slackEventBasicObject.event.text = commandWithoutReasonOfGivingPoints
        const slackEventInfoFromUserWithoutReasonOfGivignPoints = slackEventBasicObject
        const giveCommandHandler = new GiveCommandHandler(slackEventInfoFromUserWithoutReasonOfGivignPoints)
        const validMessage = giveCommandHandler.getInformationWhyUserGetsPoints()
        expect(validMessage).to.be.equal(`<@U061F7AUR> didn't give reason for giving points.`)
    })

    it('giveCommandHandler validation method should return error if sender === receiver', () => {
        slackEventBasicObject.event.text = commandWithReceiverEqualGiver
        const slackEventInfoFromUserWithReceiverEqualGiver = slackEventBasicObject
        const giveCommandHandler = new GiveCommandHandler(slackEventInfoFromUserWithReceiverEqualGiver)
        giveCommandHandler.validate()
        expect(giveCommandHandler.errorObject.isValid).to.be.equal(false)
        expect(giveCommandHandler.errorObject.message).to.be.equal('You cant add points for your self :(')
    })

    it('giveCommandHandler validation method should return error if there is wrong point amount', () => {
        slackEventBasicObject.event.text = commandWithNotValidPointsAmount
        const slackEventInfoFromUserWithNotValidPointsAmount = slackEventBasicObject
        const giveCommandHandler = new GiveCommandHandler(slackEventInfoFromUserWithNotValidPointsAmount)
        giveCommandHandler.validate()
        expect(giveCommandHandler.errorObject.isValid).to.be.equal(false)
        expect(giveCommandHandler.errorObject.message).to.be.equal('You gave: XYZ and it is not valid amount of points :(')
    })

    it('giveCommandHandler validation method should return error if there is wrong receiver username', () => {
        slackEventBasicObject.event.text = commandWithNotValidReceiver
        const slackEventInfoFromUserWithNotValidRecievier = slackEventBasicObject
        const giveCommandHandler = new GiveCommandHandler(slackEventInfoFromUserWithNotValidRecievier)
        console.log(giveCommandHandler.receiverId)
        giveCommandHandler.validate()
        expect(giveCommandHandler.errorObject.isValid).to.be.equal(false)
        expect(giveCommandHandler.errorObject.message).to.be.equal(`I can't see for who you want to give points :(`)
    })
})