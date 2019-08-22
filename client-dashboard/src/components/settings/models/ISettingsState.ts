import { IAdmin } from './IAdmin'
import { IChannel } from './IChannel'

export interface ISettingsState {
  channels: IChannel[],
  admins: IAdmin[]
}
