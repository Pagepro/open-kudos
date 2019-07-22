import {
  Body,
  Controller,
  Delete,
  Get,
  Params,
  Patch,
  Post,
  Query as QueryParam,
  Request as RequestDecorator,
  Response as ResponseDecorator,
} from '@decorators/express'
import { Response } from 'express'
import GiftService from '../../common/services/gift'
import AuthMiddleware from '../../middleware/authMiddleware'
import { IUserEnhancedRequest } from '../../middleware/definitions/authMiddleware'
import { schemaValidatorFatory } from '../../middleware/schemaValidationMiddleware'
import { INewGift } from './models'
import { GiftsPaginationSchema, NewGiftSchema } from './schemas'

@Controller('/gifts', [AuthMiddleware])
export default class GiftsController {
  private giftService = new GiftService()

  @Get('/', [schemaValidatorFatory(GiftsPaginationSchema)])
  public async getAllGifts(
    @RequestDecorator() req: IUserEnhancedRequest,
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1,
    @ResponseDecorator() res: Response
  ) {
    const teamId = req.user.team_id
    const paginatedGifts = await this.giftService.getAllPaginated(
      teamId,
      Number(limit),
      Number(page)
    )

    res.json(paginatedGifts)
  }

  @Get('/:id')
  public async getGift(
    @RequestDecorator() req: IUserEnhancedRequest,
    @Params('id') id: string,
    @ResponseDecorator() res: Response
  ) {
    const teamId = req.user.team_id
    const gift = await this.giftService.getGift(id, teamId)

    if (!gift) {
      return res.status(404).send()
    }

    res.json(gift)
  }

  @Patch('/:id', [schemaValidatorFatory(NewGiftSchema)])
  public async patchGift(
    @RequestDecorator() req: IUserEnhancedRequest,
    @Params('id') id: string,
    @Body() body: INewGift,
    @ResponseDecorator() res: Response
  ) {
    const { name, cost, description } = body
    const teamId = req.user.team_id
    const editedGift = await this.giftService.patchGift(
      id,
      teamId,
      name,
      cost,
      description
    )

    if (!editedGift) {
      return res.status(404).send()
    }

    res.json(editedGift)
  }

  @Post('/', [schemaValidatorFatory(NewGiftSchema)])
  public async postGift(
    @RequestDecorator() req: IUserEnhancedRequest,
    @Body() body: INewGift,
    @ResponseDecorator() res: Response
  ) {
    const { name, cost, description } = body
    const teamId = req.user.team_id
    const newGift = await this.giftService.addGift(
      teamId,
      name,
      cost,
      description
    )

    res.json(newGift)
  }

  @Delete('/:id', [AuthMiddleware])
  public async deleteGift(
    @RequestDecorator() req: IUserEnhancedRequest,
    @Params('id') id: string,
    @ResponseDecorator() res: Response
  ) {
    const teamId = req.user.team_id
    const deletedGift = await this.giftService.deleteGift(id, teamId)

    if (!deletedGift) {
      return res.status(404).send()
    }

    res.status(204).send()
  }
}
