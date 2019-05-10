import { MessageAttachment } from '@slack/client'
import '../../models/user.model'
import User, { IUser } from '../../models/user.model'
import { IWorkspace } from '../../models/workspace.model'
import Helpers from './helpers'
import LoggerService from './logger'
import SlackClientService from './slackClient'

export default class UserService {
  private slackClientService = new SlackClientService()
  private logger = new LoggerService()

  public create(user: IUser) {
    return User.create(user)
  }

  public async handleUserIfNotExist(teamId: string, userId: string) {
    // TODO: Add created user to cache to improve
    const doesUserExist = await this.checkIfUserExist(teamId, userId)
    if (!doesUserExist) {
      await this.createUser({
        isAdmin: false,
        teamId,
        userId
      } as IUser)
    }
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
            setDefaultsOnInsert: true,
            upsert: true,

          }
        )
      }
    } catch (error) {
      this.logger.logError(error)
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

  public async checkIfUserExist(teamId: string, userId: string) {
    const user = await this.getUser(teamId, userId)
    return user ? true : false
  }

  public async createUser(user: IUser) {
    return User.create(user)
  }

  public async getLeaderboardAttachments(teamId: string):
    Promise<MessageAttachment[]> {
    const top5Users = await User
      .find({ teamId })
      .sort({ kudosGranted: 'desc' })
      .limit(5)

    return top5Users.map((user, index) => {
      return {
        color: Helpers.getRandomHexColor(),
        title: `${index + 1}. <@${user.userId}> - ${user.kudosGranted}`,
      }
    })
  }
}
