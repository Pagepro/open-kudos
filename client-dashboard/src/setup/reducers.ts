import { combineReducers } from "redux"
import token from '../components/auth/reducers'
import { ISettingsState } from '../components/settings/models/ISettingsState'
import { IGiveKudosState } from '../components/give-kudos/models/IGiveKudosState'
import settings from '../components/settings/reducer'
import giveKudos from '../components/give-kudos/reducer'

export interface IGlobalState {
  token: string
  settings: ISettingsState,
  giveKudos: IGiveKudosState
}

export default combineReducers({
  giveKudos,
  settings,
  token
})
