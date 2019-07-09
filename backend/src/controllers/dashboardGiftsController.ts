import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import AuthMiddleware from '../middleware/authMiddleware'

@Controller('/gifts', [AuthMiddleware])
export default class DashboardGiftsController {
  @Get('/')
  public getAllGifts(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {

    res.json({ gifts: ['gift1', 'gift2'] })
  }
}
