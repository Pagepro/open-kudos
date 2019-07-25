import { AnyAction } from "redux"
import { settingsAction } from "../../setup/actions"
import { IChannel } from "./actions"

const defaultState: IChannel[] = []

const channels = (state = defaultState, action: AnyAction) => {
  const {
    type,
    payload
  } = action

  switch (type) {
    case settingsAction.getChannels:
      return payload
    default:
      return state
  }
}

export default channels
