import { combineReducers } from "redux";
import token from '../components/auth/reducers'

export interface IGlobalState {
  token: string
}

export default combineReducers({
  token
})
