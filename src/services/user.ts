import '../models/user.model'
import User, { IUser } from '../models/user.model'
import { IWorkspace } from '../models/workspace.model'
import SlackClientService from './slackClient'


// TODO: remove statics
export default class UserService {
  public static create(user: IUser) {
    return User.create(user)
  }

  public static async initUsers(workspace: IWorkspace) {
    SlackClientService.initWebClient(workspace)

    try {
      const usersToInit = await SlackClientService.getWorkspaceMembers(
        workspace.teamId
      )

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

      return true
    } catch (ex) {
      return false
      // handle error
    }
  }

  // TODO: I think user id is unique enough
  public static getUser(teamId: string, userId: string) {
    return User.findOne({
      $and: [
        { teamId },
        { userId }
      ]
    })
  }

  public static resetAllUsersGiveableKudos() {
    return User.updateMany({}, {
      $set: { kudosGiveable: 100 }
    })
  }
}
