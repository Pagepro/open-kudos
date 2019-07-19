import { message } from 'antd'
import axios from 'axios'
import { Dispatch } from 'redux'
import { settingsAction } from '../../setup/actions'

export interface IChannel {
  id: string,
  name: string
}

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
