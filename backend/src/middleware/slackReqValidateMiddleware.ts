import {
  Middleware,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { stringify } from 'query-string'
import Config from '../common/consts/config'

export default class SlackReqValidateMiddleware implements Middleware {
  public async use(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { body, headers } = req
    const {
      'x-slack-request-timestamp': slackRequestTimestamp,
      'x-slack-signature': slackSignature
    } = headers
    const bodyString = stringify(body, { sort: false })
    const dataToHash =
      `${Config.signingSecretVersion}:${slackRequestTimestamp}:${bodyString}`
    const hashedData = crypto
      .createHmac("sha256", Config.signingSecret)
      .update(dataToHash)
      .digest("hex")

    const calculatedSignatureToCompare =
      `${Config.signingSecretVersion}=${hashedData}`

    if (calculatedSignatureToCompare !== slackSignature) {
      return res.status(401).send("unauthorized")
    }

    next()
  }
}
