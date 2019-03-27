import '../../models/user.model'
import User, { IUser } from '../../models/user.model'
import { IWorkspace } from '../../models/workspace.model'
import SlackClientService from './slackClient'

export default class UserService {
  private slackClientService = new SlackClientService()
  public create(user: IUser) {
    return User.create(user)
  }

  public async initUsers(workspace: IWorkspace) {
    this.slackClientService.initWebClient(workspace)

    try {
      const usersToInit = await this.slackClientService.getWorkspaceMembers(
        workspace.teamId
      )

      for (const user of usersToInit) {
        const { teamId, userId } = user
        await User.findOneAndUpdate(
          {
            $and: [
              { teamId },
              { userId }
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
      // TODO: Add logger here when implemented
      // tslint:disable-next-line:no-console
      console.log(ex.message)
      return false
      // handle error
    }
  }

  public getUser(teamId: string, userId: string) {
    return User.findOne({
      $and: [
        { teamId },
        { userId }
      ]
    })
  }

  public resetAllUsersGiveableKudos() {
    return User.updateMany({}, {
      $set: { kudosGiveable: 100 }
    })
  }
}
