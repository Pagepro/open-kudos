import { expect } from 'chai'
import GiveCommandHandler from './giveCommandHandler'
import { ISlackEventInfo } from '../interfaces'

const slackEventInfoFromUserWithFullCommand: ISlackEventInfo = {
    token: 'ZZZZZZWSxiZZZ2yIvs3peJ',
    team_id: 'T061EG9R6',
    api_app_id: 'A0MDYCDME',
    event: {
        type: 'app_mention',
        user: 'U061F7AUR',
        text: '<@U0LAN0Z10> give <@U0LAN0Z99> 10 for test purpose',
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

const slackEventInfoFromUserWithoutReasonOfGivignPoints: ISlackEventInfo = {
    token: 'ZZZZZZWSxiZZZ2yIvs3peJ',
    team_id: 'T061EG9R6',
    api_app_id: 'A0MDYCDME',
    event: {
        type: 'app_mention',
        user: 'U061F7AUR',
        text: '<@U061F7AUR> give <@U0LAN0Z99> 10',
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

const slackEventInfoFromUserWithReceiverEqualGiver: ISlackEventInfo = {
    token: 'ZZZZZZWSxiZZZ2yIvs3peJ',
    team_id: 'T061EG9R6',
    api_app_id: 'A0MDYCDME',
    event: {
        type: 'app_mention',
        user: 'U061F7AUR',
        text: '<@U061F7AUR> give <@U061F7AUR> 10 for test purpose',
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

const slackEventInfoFromUserWithNotValidPointsAmount: ISlackEventInfo = {
    token: 'ZZZZZZWSxiZZZ2yIvs3peJ',
    team_id: 'T061EG9R6',
    api_app_id: 'A0MDYCDME',
    event: {
        type: 'app_mention',
        user: 'U061F7AUR',
        text: '<@U061F7AUR> give <@U0LAN0Z99> XYZ for test purpose',
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

const slackEventInfoFromUserWithNotValidRecievier: ISlackEventInfo = {
    token: 'ZZZZZZWSxiZZZ2yIvs3peJ',
    team_id: 'T061EG9R6',
    api_app_id: 'A0MDYCDME',
    event: {
        type: 'app_mention',
        user: 'U061F7AUR',
        text: '<@U061F7AUR> give notValidUser 10 for test purpose',
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

describe('GiveCommandHandler tests', function () {
    it('getInformationWhyUserGetsPoints should return full information about the reason for giving kudos', () => {
        const giveCommandHandler = new GiveCommandHandler(slackEventInfoFromUserWithFullCommand)
        const validMessage = giveCommandHandler.getInformationWhyUserGetsPoints()
        expect(validMessage).to.be.equal('<@U061F7AUR> give <@U0LAN0Z99> 10 for test purpose')
    })

    it('getInformationWhyUserGetsPoints should return basic information about the reason for giving kudos', () => {
        const giveCommandHandler = new GiveCommandHandler(slackEventInfoFromUserWithoutReasonOfGivignPoints)
        const validMessage = giveCommandHandler.getInformationWhyUserGetsPoints()
        expect(validMessage).to.be.equal(`<@U061F7AUR> didn't give reason for giving points.`)
    })

    it('giveCommandHandler validation method should return error if sender === receiver', () => {
        const giveCommandHandler = new GiveCommandHandler(slackEventInfoFromUserWithReceiverEqualGiver)
        giveCommandHandler.validate()
        expect(giveCommandHandler.errorObject.isValid).to.be.equal(false)
        expect(giveCommandHandler.errorObject.message).to.be.equal('You cant add points for your self :(')
    })

    it('giveCommandHandler validation method should return error if there is wrong point amount', () => {
        const giveCommandHandler = new GiveCommandHandler(slackEventInfoFromUserWithNotValidPointsAmount)
        giveCommandHandler.validate()
        expect(giveCommandHandler.errorObject.isValid).to.be.equal(false)
        expect(giveCommandHandler.errorObject.message).to.be.equal('You gave: XYZ and it is not valid amount of points :(')
    })

    it('giveCommandHandler validation method should return error if there is wrong receiver username', () => {
        const giveCommandHandler = new GiveCommandHandler(slackEventInfoFromUserWithNotValidRecievier)
        console.log(giveCommandHandler.receiverId)
        giveCommandHandler.validate()
        expect(giveCommandHandler.errorObject.isValid).to.be.equal(false)
        expect(giveCommandHandler.errorObject.message).to.be.equal(`I can't see for who you want to give points :(`)
    })
})
