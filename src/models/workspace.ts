interface WorkspaceInterface {
    teamName: string,
    active: boolean,
    teamId: string,
    accessToken: string,
    botUserId: string,
    botAccessToken: string
}

export default class Workspace implements WorkspaceInterface {
    teamName: string
    active: boolean
    teamId: string
    accessToken: string
    botUserId: string
    botAccessToken: string
    constructor(obj: any) {
        this.teamId = obj.teamId || obj.team_id,
        this.active = obj.active ? obj.active : true,
        this.teamName = obj.teamName || obj.team_name,
        this.accessToken = obj.accessToken || obj.access_token,
        this.botUserId = obj.botUserId || obj.bot ? obj.bot.bot_user_id : undefined,
        this.botAccessToken = obj.botAccessToken || obj.bot ? obj.bot.bot_access_token : undefined
    }
}

export const schema = {
    'bsonType': 'object'
}
