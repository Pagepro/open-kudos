import { message } from 'antd'
import axios from 'axios'
import { Dispatch } from 'redux'
import { settingsAction } from '../../setup/actions'
import { IAdmin } from './models/IAdmin'
import { IChannel } from './models/IChannel'


export const getChannels = () => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await axios.get<IChannel[]>('/api/channels')

    dispatch({
      payload: data,
      type: settingsAction.getChannels
    })
  } catch (error) {
    message.error(error.message)
  }
}

export const getAdmins = () => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await axios.get<IAdmin[]>('/api/users/admins')

    dispatch({
      payload: data,
      type: settingsAction.getAdmins
    })
  } catch (error) {
    message.error(error.message)
  }
}
