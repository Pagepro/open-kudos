import {
  Middleware,
} from '@decorators/express'
import axios from 'axios'
import { NextFunction, Request, Response } from 'express'

interface IAuthTestResponse {
  ok: boolean
  url: string
  team: string
  user: string
  team_id: string
  user_id: string
}

export default class AuthMiddleware implements Middleware {
  public async use(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const { authorization } = request.headers
    const authResponse = await axios.post<IAuthTestResponse>(
      'https://slack.com/api/auth.test', {}, {
        headers: { authorization }
      })

    if (authResponse.data.ok) {
      request.body = {
        user: {
          team_id: authResponse.data.team_id,
          user_id: authResponse.data.user_id,
          username: authResponse.data.user,
        }
      }
      return next()
    }

    response.status(401).send("unauthorized")
  }
}
