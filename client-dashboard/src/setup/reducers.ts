import { combineReducers } from "redux"
import token from '../components/auth/reducers'
import userRole from '../components/auth/userRoleReducer'
import { ISettingsState } from '../components/settings/models/ISettingsState'
import { IGiveKudosState } from '../components/give-kudos/models/IGiveKudosState'
import { IUserRole } from '../components/settings/models/IUserRole'
import settings from '../components/settings/reducer'
import giveKudos from '../components/give-kudos/reducer'

export interface IGlobalState {
  token: string
  userRole: IUserRole,
  settings: ISettingsState,
  giveKudos: IGiveKudosState
}

export default combineReducers({
  giveKudos,
  settings,
  userRole,
  token
})
