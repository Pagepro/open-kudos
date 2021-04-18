import { message } from 'antd'
import axios from 'axios'
import { Dispatch } from 'redux'
import { giveKudosAction } from '../../setup/actions'
import { ITeamMember } from '../give-kudos/models/ITeamMember'

export const getTeamMembers = () => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await axios.get<ITeamMember[]>('/api/users/teamMembers')
    dispatch({
      payload: data,
      type: giveKudosAction.getTeamMembers
    })
  } catch (error) {
    message.error(error.message)
  }
}
