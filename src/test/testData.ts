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

const testGifts: Array<Omit<IGift, "teamId">> = [
  {
    amount: 10,
    cost: 10,
    description: 'Cool game description',
    isAvailable: false,
    name: 'Cool-gam-2000'
  },
  {
    amount: 0,
    cost: 10,
    description: 'This is thermal mug description',
    name: 'Thermal mug'
  },
  {
    amount: 10,
    cost: 900,
    description: 'This is Monopoly Game description',
    name: 'Monopoly Game'
  },
  {
    amount: 10,
    cost: 100,
    description: 'This is Coffee description',
    name: 'Coffee'
  }
]

const realGifts: Array<Omit<IGift, "teamId">> = [
  {
    amount: 10,
    cost: 100,
    description: '',
    name: 'Chocolate / Rafaello / Craft Beer :candy:'
  },
  {
    amount: 10,
    cost: 300,
    description: '',
    name: 'Thermal mug :cup_with_straw:'
  },
  {
    amount: 10,
    cost: 400,
    description: '',
    name: 'Powerbank :zap:'
  },
  {
    amount: 10,
    cost: 400,
    description: '',
    name: 'Mug warmer :fire:'
  },
  {
    amount: 10,
    cost: 600,
    description: '',
    name: 'Cinema tickets :popcorn:'
  },
  {
    amount: 10,
    cost: 800,
    description: '',
    name: 'Hair dresser / barber :haircut:'
  },
  {
    amount: 10,
    cost: 1400,
    description: '',
    name: 'Monopoly Game :game_die:'
  },
  {
    amount: 10,
    cost: 2000,
    description: '',
    name: 'Laptop bag :handbag:'
  },
  {
    amount: 10,
    cost: 2000,
    description: '',
    name: 'Apart Bracelet :ring:'
  },
  {
    amount: 10,
    cost: 3000,
    description: '',
    name: 'Plane cabin bag :airplane_arriving:'
  },
  {
    amount: 10,
    cost: 3000,
    description: '',
    name: 'Laptop backpack :school_satchel:'
  },
  {
    amount: 10,
    cost: 4000,
    description: '',
    name: 'Lamborghini ride :police_car:'
  },
  {
    amount: 10,
    cost: 4000,
    description: '',
    name: 'KAZAR bag :handbag:'
  },
  {
    amount: 10,
    cost: 6000,
    description: '',
    name: 'NewBalance Shoes :shoe:'
  },
  {
    amount: 10,
    cost: 7000,
    description: '',
    name: 'Electric skateboard :zap:'
  },
  {
    amount: 10,
    cost: 8000,
    description: '',
    name: 'Ray Ban Glasses :eyeglasses:'
  },
  {
    amount: 10,
    cost: 9000,
    description: '',
    name: 'Weekend trip :beach_with_umbrella:'
  }
]

export {
  testUserData,
  slackEventBasicObject,
  slackActionBasic,
  testReceiverData,
  testTeamId,
  testGifts,
  realGifts,
  gameGiftIndex,
  mugGiftIndex,
  monopolyGiftIndex,
  coffeeGiftIndex,
  testBuyerUserData
}
