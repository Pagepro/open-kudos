import { combineReducers } from "redux"
import token from '../components/auth/reducers'
import { IChannel } from "../components/settings/actions"
import channels from '../components/settings/reducers'

export interface IGlobalState {
  token: string
  channels: IChannel[]
}

export default combineReducers({
  channels,
  token
})
