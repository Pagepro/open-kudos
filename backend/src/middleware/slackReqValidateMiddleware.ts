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
    const { body } = req
    const signingSecretVersion = Config.signingSecretVersion
    const signingSecret = Config.signingSecret
    const slackRequestTimestamp = req.headers['x-slack-request-timestamp']
    const slackSignature = req.headers['x-slack-signature']
    const bodyString = stringify(body, { sort: false })
    const dataToHash =
      `${signingSecretVersion}:${slackRequestTimestamp}:${bodyString}`
    const hashedData = crypto
      .createHmac("sha256", signingSecret)
      .update(dataToHash)
      .digest("hex")

    const calculatedSignatureToCompare = `${signingSecretVersion}=${hashedData}`

    if (calculatedSignatureToCompare !== slackSignature) {
      return res.status(401).send("unauthorized")
    }

    next()
  }
}
