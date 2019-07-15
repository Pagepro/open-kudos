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
  public command(
    @ResponseDecorator() res: Response,
    @RequestDecorator() { body }: Request) {
    res.send('')
  }
}
