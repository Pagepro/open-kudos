import {
  Controller,
  Get,
  Query as QueryParam,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Response } from 'express'
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

  @Get('/no_kudos', [schemaValidatorFatory(UsersPaginationSchema)])
  public async getUsersWithoutKudos(
    @RequestDecorator() req: IUserEnhancedRequest,
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1,
    @ResponseDecorator() res: Response
  ) {
    const teamId = req.user.team_id
    const paginatedUsersWithoutKudosGranted =
      await this.userService.getAllPaginatedWithoutKudos(
        teamId,
        Number(limit),
        Number(page)
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
