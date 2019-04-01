import { ISlackEventInfo } from "../controllers/definitions/slackController"
import { IUser } from "../models/user.model"

const testTeamName = 'TEST'
const testUserId = 'U061F7AUR'
const slackEventBasicObject: ISlackEventInfo = {
  api_app_id: 'A0MDYCDME',
  authed_users: [
    'U0LAN0Z89'
  ],
  event: {
    channel: 'C0LAN2Q65',
    channel_type: 'testType',
    client_msg_id: 'testId',
    event_ts: '1515449438000011',
    text: '',
    ts: '1515449438.000011',
    type: 'app_mention',
    user: testUserId,
  },
  event_id: 'Ev0MDYGDKJ',
  event_time: 1515449438000011,
  team_id: testTeamName,
  token: 'ZZZZZZWSxiZZZ2yIvs3peJ',
  type: 'event_callback',
}

const testUserData: IUser = {
  isAdmin: true,
  kudosGiveable: 50,
  kudosGranted: 50,
  kudosSpendable: 20,
  name: 'test.test',
  realName: 'testUser',
  teamId: testTeamName,
  userId: testUserId
}

export { testUserData, slackEventBasicObject }
