import {
  Controller,
  Get,
  Response as ResponseDecorator
} from '@decorators/express'
import { Response } from 'express'

@Controller('/test')
export default class TestController {
  @Get('/')
  public async getData(@ResponseDecorator() res: Response) {
    res.send({
      test: 'test'
    })
  }
}
