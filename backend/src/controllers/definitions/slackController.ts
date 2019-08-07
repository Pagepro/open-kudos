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

export interface ISlackCommandInfo {
  channel_id: string
  channel_name: string
  command: string
  response_url: string
  team_domain: string
  team_id: string
  text: string
  token: string
  trigger_id: string
  user_id: string
  user_name: string
}

export interface IMessageConsumer {
  teamId: string,
  channel: string,
  user?: string
}

export interface ISlackActionPayload {
  payload: string
}

export interface ISlackActionBlock {
  type: string,
  team: { id: string, domain: string },
  user: {
    id: string,
    username: string,
    name: string,
    team_id: string
  },
  api_app_id: string,
  token: string,
  container: {
    type: string,
    message_ts: string,
    channel_id: string,
    is_ephemeral: true
  },
  trigger_id: string,
  channel: { id: string, name: string },
  response_url: string,
  actions: [
    {
      action_id: string,
      block_id: string,
      text: {
        type: string,
        text: string
      },
      value: string,
      type: string,
      action_ts: string
    }
  ]
}
