import { AnyAction } from 'redux'
import { giveKudosAction } from '../../setup/actions'
import { IGiveKudosState } from './models/IGiveKudosState'

const defaultState: IGiveKudosState = {
  teamMembers: []
}

const settingsReducer = (state = defaultState, action: AnyAction) => {
  const {
    type,
    payload
  } = action

  switch (type) {
    case giveKudosAction.getTeamMembers:
      return {
        ...state,
        teamMembers: payload
      }
    default:
      return state
  }
}

export default settingsReducer
