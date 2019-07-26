import {
  Controller,
  Get,
  Query as QueryParam,
  Request as RequestDecorator,
  Response as ResponseDecorator,
} from '@decorators/express'
import { Response } from 'express'
import TransferService from '../../common/services/transfer'
import AuthMiddleware from '../../middleware/authMiddleware'
import { IUserEnhancedRequest } from '../../middleware/definitions/authMiddleware'
import { schemaValidatorFatory } from '../../middleware/schemaValidationMiddleware'
import { TransfersPaginationSchema } from './schemas'

@Controller('/transfers', [AuthMiddleware])
export default class TransfersController {
  private transfersService = new TransferService()

  @Get('/', [schemaValidatorFatory(TransfersPaginationSchema)])
  public async getAllGifts(
    @RequestDecorator() req: IUserEnhancedRequest,
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1,
    @ResponseDecorator() res: Response
  ) {
    const teamId = req.user.team_id
    const paginatedTransfers = await this.transfersService.getAllPaginated(
      teamId,
      Number(limit),
      Number(page)
    )

    res.json(paginatedTransfers)
  }
}
