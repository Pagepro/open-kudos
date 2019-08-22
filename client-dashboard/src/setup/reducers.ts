import { combineReducers } from "redux"
import token from '../components/auth/reducers'
import { ISettingsState } from '../components/settings/models/ISettingsState'
import settings from '../components/settings/reducer'

export interface IGlobalState {
  token: string
  settings: ISettingsState
}

export default combineReducers({
  settings,
  token
})
