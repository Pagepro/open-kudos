import { KnownBlock } from '@slack/client'
import '../../models/user.model'
import User, { IUser } from '../../models/user.model'
import { IWorkspace } from '../../models/workspace.model'
import { IKudosAmountForWorkspace } from './definitions/settingsService'
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
        const { email, isAdmin, teamId, userId } = user

        await User.findOneAndUpdate(
          {
            $and: [
              { teamId },
              { userId }
            ]
          },
          {
            email,
            isAdmin,
            teamId,
            userId
          },
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

  public resetAllUsersGiveableKudos
    (kudosAmountForWorkspace: IKudosAmountForWorkspace[]) {
    const updateUsersFromTeams = kudosAmountForWorkspace
      .map((item) => User.updateMany(
        { teamId: item.teamId },
        { $set: { kudosGiveable: item.monthlyKudosAmount || 100 } }).exec()
      )

    return Promise.all(updateUsersFromTeams)
  }

  public async getAdmin(teamId: string) {
    return await User.findOne({
      isAdmin: true,
      teamId
    })
  }

  public async getAdmins(teamId: string) {
    const users =
      await this.slackClientService.getWorkspaceMembers(teamId, false)

    const admins = await User.find({
      isAdmin: true,
      teamId
    })

    return admins.map(({_id, name, userId}) => ({
      _id,
      name: name || users.find(user => user.userId === userId).name,
      userId,
    }))
  }

  public async checkIfUserExist(
    teamId: string,
    userId: string
  ): Promise<boolean> {
    const user = await this.getUser(teamId, userId)

    return !!user
  }

  public async createUser(user: IUser) {
    return User.create(user)
  }

  public async getLeaderboardBlocks(teamId: string): Promise<KnownBlock[]> {
    const usersPosition = [':one:', ':two:', ':three:', ':four:', ':five:']
    const top5Users = await User
      .find({ teamId })
      .sort({ kudosGranted: 'desc' })
      .limit(5)

    const text = top5Users
      .map((user, index) =>
        `${usersPosition[index]} <@${user.userId}> - ${user.kudosGranted}\n`)
      .join('\n')

    return [
      {
        text: {
          text,
          type: "mrkdwn"
        },
        type: "section",
      }
    ]
  }

  public async getAllPaginatedWithoutKudos(
    teamId: string,
    limit?: number,
    page?: number
  ) {
    const aggregate = User.aggregate()
    aggregate.match({
      kudosGranted: 0,
      teamId
    })

    const members = await this.slackClientService.getWorkspaceMembers(
      teamId,
      false
    )

    const users = await User.aggregatePaginate(aggregate, {
      limit,
      page
    })

    return {
      ...users,
      docs: users.docs.map(user => ({
        ...user,
        userName: members.find(
          ({ userId }) => userId === user.userId
        ).name
      }))
    }
  }
}
