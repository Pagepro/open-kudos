import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'

@Controller('/test')
export default class TestController {
  @Get('/')
  public getData(@RequestDecorator() req: Request, @ResponseDecorator() res: Response) {
    res.send({
      test: 'test'
    })
  }
}
