import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'

@Controller('/')
export default class DashboardPageController {
  @Get('/dashboard')
  public dashboardPage(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    res.redirect('/dashboard')
  }
}
