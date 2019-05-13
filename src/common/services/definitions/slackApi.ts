import { WebAPICallResult } from "@slack/client"

interface IWithId {
  id: string
}

interface ISlackUserResponse extends IWithId {
  team_id: string
  name: string
  deleted: boolean
  profile: ISlackProfileResponse
  is_admin?: boolean
  is_owner?: boolean
  is_primary_owner?: boolean
  is_bot: boolean
  is_app_user: boolean
}

interface ISlackProfileResponse {
  title: string
  phone: string
  skype: string
  real_name: string
  real_name_normalized: string
  display_name: string
  display_name_normalized: string
  status_text: string
  status_emoji: string
  status_expiration: number,
  avatar_hash: string
  email: string
  image_24: string
  image_32: string
  image_48: string
  image_72: string
  image_192: string
  image_512: string
  status_text_canonical: string,
  team: string
}

interface IChannel extends IWithId {
  name: string,
  is_channel: boolean,
  created: number,
  creator: string,
  is_archived: boolean,
  is_general: boolean,
  name_normalized: string,
}

interface IImOpenResponse extends WebAPICallResult {
  channel?: IWithId
}

interface IExtendedWebApiCallResult extends WebAPICallResult {
  members: ISlackUserResponse[]
}

interface IChannelsListResponse extends WebAPICallResult {
  channels?: [IChannel]
}

export {
  IImOpenResponse,
  IExtendedWebApiCallResult,
  IChannelsListResponse
}
