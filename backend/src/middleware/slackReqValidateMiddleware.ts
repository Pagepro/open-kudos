import {
  Middleware,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'

export default class SlackReqValidateMiddleware implements Middleware {

  public async use(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response,
    next: NextFunction
  ): Promise<void> {
    const { body } = req
    const signingSecretVersion = process.env.SIGNING_SECRET_VERSION
    const signingSecret = process.env.SIGNING_SECRET
    const slackRequestTimestamp = req.headers['x-slack-request-timestamp']
    const slackSignature = req.headers['x-slack-signature']
    const bodyString = Object.keys(body)
      .map((key) => `${key}=${encodeURIComponent(body[key])}`)
      .join('&')

    // tslint:disable-next-line: max-line-length
    const dataToHash = `${signingSecretVersion}:${slackRequestTimestamp}:${bodyString}`
    const hashedData = crypto
      .createHmac("sha256", signingSecret)
      .update(dataToHash)
      .digest("hex")

    const calculatedSignatureToCompare = `${signingSecretVersion}=${hashedData}`

    if (slackSignature === calculatedSignatureToCompare) {
      return next()
    }

    next()
  }
}
