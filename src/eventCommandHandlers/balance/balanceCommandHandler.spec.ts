import database, { CustomDb } from '../../config/mongodb'
import { expect } from 'chai'
import BalanceCommandHandler from './balanceCommandHandler'
import { ISlackEventInfo } from '../interfaces'
import TestHelper from '../../utils/testHelper'

const testCollectionName = 'TEST_users'
const testTeamName = 'TEST'
const testUserId = 'U061F7AUR'
const eventWithFullCommand = { event: { text: '@kudos balance' } }
const testHelper = new TestHelper<ISlackEventInfo>()
const slackEventBasicObject: ISlackEventInfo = {
    token: 'ZZZZZZWSxiZZZ2yIvs3peJ',
    team_id: testTeamName,
    api_app_id: 'A0MDYCDME',
    event: {
        type: 'app_mention',
        user: testUserId,
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

describe('GiveCommandHandler tests', function () {
    before(async () => {
        const db: CustomDb = await database()
        await db.createCollection(testCollectionName)
        await db.collection(testCollectionName).insertOne({
            userId: testUserId,
            isAdmin: true,
            kudosGiveable: 50,
            kudosGranted: 50,
            kudosSpendable: 20,
            locale: 'en-US',
            name: 'test.test',
            realName: 'testUser'
        })
    })

    it('getInformationWhyUserGetsPoints should return full information about the reason for giving kudos', async () => {
        const slackEventInfoFromUserWithFullCommand = testHelper.createTestObject(slackEventBasicObject, eventWithFullCommand)
        const balanceCommandHandler = new BalanceCommandHandler(slackEventInfoFromUserWithFullCommand)
        const balanceInformation = await balanceCommandHandler.getBalanceInformation()
        expect(balanceInformation).to.be.equal(`Here is your current balance \n\nGiveable Balance\n50 Kudos\nGiveable balances reset at the beginning of the month. Use 'em or lose 'em\n\nSpendable Balance\n20 Kudos \nSpendable Kudos never expire. Use them to buy cool things in the store`)
    })

    after(async () => {
        const db: CustomDb = await database()
        await db.dropCollection(testCollectionName)
    })
})