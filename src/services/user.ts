import '../models/user.model'
import User, { IUser } from '../models/user.model'
import { IWorkspace } from '../models/workspace.model'
import SlackClientService from './slackClient'

export default class UserService {
  public static create(user: IUser) {
    return User.create(user)
  }

  public static async initUsers(workspace: IWorkspace) {
    const slackClient = new SlackClientService(workspace.botAccessToken)
    let operationResult = false
    try {
      const usersToInit = await slackClient.getWorkspaceMembers()
      for (const user of usersToInit) {
        await User.findOneAndUpdate(
          {
            $and: [
              { teamId: user.teamId },
              { userId: user.userId }
            ]
          },
          user,
          {
            upsert: true
          }
        )
      }
      operationResult = true
    } catch (ex) {
      operationResult = false
      // handle error
    }

    return operationResult
  }
}
