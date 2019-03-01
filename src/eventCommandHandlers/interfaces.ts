export interface ISlackEventInfo {
    challenge?: object
    token: string
    team_id: string
    api_app_id: string
    event?:
    {
        subtype?: string
        bot_id?: string
        client_msg_id: string
        type: string
        text: string
        user: string
        ts: string
        channel: string
        event_ts: string
        channel_type: string
    },
    type: string
    event_id: string
    event_time: number,
    authed_users: string[]
}