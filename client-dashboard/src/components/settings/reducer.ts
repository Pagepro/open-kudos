import { AnyAction } from 'redux'
import { settingsAction } from '../../setup/actions'
import { ISettingsState } from './models/ISettingsState'

const defaultState: ISettingsState = {
  admins: [],
  channels: []
}

const settingsReducer = (state = defaultState, action: AnyAction) => {
  const {
    type,
    payload
  } = action

  switch (type) {
    case settingsAction.getChannels:
      return {
        ...state,
        channels: payload
      }
    case settingsAction.getAdmins:
      return {
        ...state,
        admins: payload
      }
    default:
      return state
  }
}

export default settingsReducer
