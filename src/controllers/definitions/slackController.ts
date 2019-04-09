export enum SlackEventSubtype {
  botMessage = 'bot_message'
}

interface ISlackEventData {
  subtype?: SlackEventSubtype
  bot_id?: string
  client_msg_id: string
  type: string
  text: string
  user: string
  ts: string
  channel: string
  event_ts: string
  channel_type: string
}

export interface ISlackEventInfo {
  challenge?: object
  token: string
  team_id: string
  api_app_id: string
  event?: ISlackEventData
  type: string
  event_id: string
  event_time: number,
  authed_users: string[]
}

export interface IMessageConsumer {
  teamId: string,
  channel: string,
  user?: string
}

export interface ISlackActionPayload {
  payload: string
}

export interface ISlackAction {
  type: string,
  actions: [
    {
      name: string,
      type: string,
      value: string
    }
  ],
  callback_id: string,
  team: {
    id: string,
    domain: string
  },
  channel: {
    id: string,
    name: string
  },
  user: {
    id: string,
    name: string
  },
  action_ts: string,
  message_ts: string,
  attachment_id: string,
  token: string,
  is_app_unfurl: boolean,
  response_url: string,
  trigger_id: string
}
