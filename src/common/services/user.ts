import '../../models/user.model'
import User, { IUser } from '../../models/user.model'
import { IWorkspace } from '../../models/workspace.model'
import LoggerService from './logger'
import SlackClientService from './slackClient'

export default class UserService {
  private slackClientService = new SlackClientService()
  private logger = new LoggerService()

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
    } catch (error) {
      this.logger.logError(error)
      return false
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
