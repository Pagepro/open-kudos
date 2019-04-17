import { ISlackAction, ISlackEventInfo } from "../controllers/definitions/slackController"
import { IGift } from "../models/gift.model"
import { IUser } from "../models/user.model"

const testTeamId = 'USERS_TEAM_ID'
const testUserId = 'U061F7AUR'
const testBuyerUserId = 'U0TESTBUR'
const receiverUserId = 'U072A8BOG'
const testUserName = 'test.test'

const slackActionBasic: ISlackAction = {
  action_ts: "1471473851.000000",
  actions: [
    {
      name: "yes",
      type: "button",
      value: "yes"
    }
  ],
  attachment_id: "1",
  callback_id: "",
  channel: {
    id: "CHANNEL_ID",
    name: "CHANNEL_NAME"
  },
  is_app_unfurl: false,
  message_ts: "1471473846.000000",
  response_url: "UNIQUE_RESPONSE_URL",
  team: {
    domain: "TEAM_NAME",
    id: testTeamId
  },
  token: "TOKEN",
  trigger_id: "test",
  type: "test",
  user: {
    id: testUserId,
    name:
      testUserName
  }
}

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
  team_id: testTeamId,
  token: 'ZZZZZZWSxiZZZ2yIvs3peJ',
  type: 'event_callback',
}

const testBuyerUserData: IUser = {
  isAdmin: true,
  kudosGiveable: 50,
  kudosGranted: 50,
  kudosSpendable: 200,
  name: 'buyer',
  realName: 'testBuyer',
  teamId: testTeamId,
  userId: testBuyerUserId
}

const testUserData: IUser = {
  isAdmin: true,
  kudosGiveable: 50,
  kudosGranted: 50,
  kudosSpendable: 20,
  name: testUserName,
  realName: 'testUser',
  teamId: testTeamId,
  userId: testUserId
}

const testReceiverData: IUser = {
  isAdmin: true,
  kudosGiveable: 50,
  kudosGranted: 50,
  kudosSpendable: 20,
  name: 'receiver.receiver',
  realName: 'receiverUser',
  teamId: testTeamId,
  userId: receiverUserId
}

const gameGiftIndex = 0
const mugGiftIndex = 1
const monopolyGiftIndex = 2
const coffeeGiftIndex = 3

const gifts: IGift[] = [
  {
    amount: 10,
    cost: 10,
    description: 'Cool game description',
    isAvailable: false,
    name: 'Cool-gam-2000',
    teamId: ''
  },
  {
    amount: 0,
    cost: 10,
    description: 'This is thermal mug description',
    name: 'Thermal mug',
    teamId: ''
  },
  {
    amount: 10,
    cost: 900,
    description: 'This is Monopoly Game description',
    name: 'Monopoly Game',
    teamId: ''
  },
  {
    amount: 10,
    cost: 100,
    description: 'This is Coffee description',
    name: 'Coffee',
    teamId: ''
  }
]

export {
  testUserData,
  slackEventBasicObject,
  slackActionBasic,
  testReceiverData,
  gifts,
  testTeamId,
  gameGiftIndex,
  mugGiftIndex,
  monopolyGiftIndex,
  coffeeGiftIndex,
  testBuyerUserData
}
