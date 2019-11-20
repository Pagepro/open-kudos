import {
  Controller,
  Get,
  Query as QueryParam,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Response } from 'express'
import { Parser } from 'json2csv'
import { SortOrder } from '../../common/definitions/sortOrder'
import UserService from '../../common/services/user'
import AuthMiddleware from '../../middleware/authMiddleware'
import { IUserEnhancedRequest } from '../../middleware/definitions/authMiddleware'
import { schemaValidatorFatory } from '../../middleware/schemaValidationMiddleware'
import { UsersPaginationSchema } from './schemas'
@Controller('/users', [AuthMiddleware])
export default class UsersController {
  private userService = new UserService()

  @Get('/me')
  public async auth(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    const { user } = req.user
    res.json({ user })
  }

  @Get('/team/export')
  public async exportTeam(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    const teamId = req.user.team_id
    const users = await this.userService.getTeamInfo(teamId)
    const fields = [
      {
        label: 'Name',
        value: 'userName'
      },
      {
        label: 'Kudos to spend',
        value: 'kudosSpendable'
      },
      {
        label: 'Kudos to give',
        value: 'kudosGiveable'
      },
      {
        label: 'Kudos granted',
        value: 'kudosGranted'
      },
    ]
    const parser = new Parser({ fields })
    const csv = parser.parse(users.docs)
    res.attachment('team.csv')
    res.status(200).send(csv)
  }

  @Get('/team', [schemaValidatorFatory(UsersPaginationSchema)])
  public async getUsersWithoutKudos(
    @RequestDecorator() req: IUserEnhancedRequest,
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1,
    @QueryParam('sortOrder') sortOrder: SortOrder = 'ascend',
    @QueryParam('sortColumn') sortColumn: string = String.empty,
    @ResponseDecorator() res: Response
  ) {
    const teamId = req.user.team_id
    const paginatedUsersWithoutKudosGranted =
      await this.userService.getTeamInfo(
        teamId,
        Number(limit),
        Number(page),
        sortOrder,
        sortColumn
      )

    res.json(paginatedUsersWithoutKudosGranted)
  }

  @Get('/admins')
  public async getAdmins(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    res.json(
      await this.userService.getAdmins(
        req.user.team_id
      )
    )
  }
}
