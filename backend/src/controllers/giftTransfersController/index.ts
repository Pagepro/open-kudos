import {
  Body,
  Controller,
  Get,
  Params,
  Patch,
  Query as QueryParam,
  Request as RequestDecorator,
  Response as ResponseDecorator,
} from '@decorators/express'
import { Response } from 'express'
import GiftTransferService from '../../common/services/giftTransfer'
import AuthMiddleware from '../../middleware/authMiddleware'
import { IUserEnhancedRequest } from '../../middleware/definitions/authMiddleware'
import { schemaValidatorFatory } from '../../middleware/schemaValidationMiddleware'
import { GiftTransfersPaginationSchema, UpdateGiftTransferSchema } from '../giftTransfersController/schemas'


@Controller('/gifts/requests', [AuthMiddleware])
export default class GiftTransfersController {
  private giftTransferService = new GiftTransferService()

  @Get('/', [schemaValidatorFatory(GiftTransfersPaginationSchema)])
  public async getAllGifts(
    @RequestDecorator() req: IUserEnhancedRequest,
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1,
    @ResponseDecorator() res: Response
  ) {
    const teamId = req.user.team_id
    const paginatedTransfers = await this.giftTransferService.getAllPaginated(
      teamId,
      Number(limit),
      Number(page)
    )

    res.json(paginatedTransfers)
  }

  @Patch('/:id', [schemaValidatorFatory(UpdateGiftTransferSchema)])
  public async patchGift(
    @RequestDecorator() req: IUserEnhancedRequest,
    @Params('id') id: string,
    @Body('isNewStatus') isNewStatus: boolean,
    @ResponseDecorator() res: Response
  ) {
    const teamId = req.user.team_id
    const editedGiftTransfer = await this.giftTransferService.patchGiftTransfer(
      id,
      teamId,
      isNewStatus
    )

    if (!editedGiftTransfer) {
      return res.status(404).send()
    }

    res.json(editedGiftTransfer)
  }
}
