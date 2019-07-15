import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator,
  Query as QueryParam
} from '@decorators/express'
import { Request, Response } from 'express'
import AuthMiddleware from '../middleware/authMiddleware'
import GiftService from '../common/services/gift'
import { IUserEnhancedRequest } from '../middleware/definitions/authMiddleware'

@Controller('/gifts', [AuthMiddleware])
export default class GiftsController {
  private giftService = new GiftService()

  @Get('/')
  public async getAllGifts(
    @RequestDecorator() req: IUserEnhancedRequest,
    @QueryParam('skip') offset: number = 0,
    @QueryParam('take') limit: number = 10,
    @ResponseDecorator() res: Response
  ) {
    try {
      const paginatedGifts = await this.giftService.getAllPaginated({
        isAvailable: true,
        teamId: req.user.team_id
      }, {
        limit: +limit,
        offset: +offset,
        sort: {
          cost: 1
        }
      })
      res.json(paginatedGifts)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}
