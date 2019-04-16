import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import axios from 'axios'
import { Request, Response } from 'express'

@Controller('/auth')
export default class AuthController {
  @Get('/')
  public async auth(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    try {
      // tslint:disable-next-line:no-console
      console.log('host', req.headers.host)
      const response = await axios.get('https://slack.com/api/oauth.access', {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: req.query.code,
          redirect_uri: `https://a08a247a.ngrok.io/api/auth`
        }
      })

      // tslint:disable-next-line:no-console
      console.log('token', response.data)
      const response2 = await axios.post(
        'https://slack.com/api/auth.test', {}, {
          headers: { 'Authorization': `Bearer ${response.data.access_token}` }
        })

      // tslint:disable-next-line:no-console
      console.log('response2 test', response2.data)
      res.end('Auth')
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error)
      res.end('error')
    }
  }
}
// function slackAuth(req: Request, res: Response, next: NextFunction) {
//   console.log('host', req.headers.host)
//   axios.get('https://slack.com/api/oauth.access', {
//       params: {
//           code: req.query.code,
//           client_id: process.env.CLIENT_ID,
//           client_secret: process.env.CLIENT_SECRET,
//           redirect_uri: `${req.protocol}://${req.headers.host}/api/slack/auth`
//       }
//   }).then((response) => {
//       console.log('token', response.data)
//       axios.post('https://slack.com/api/auth.test', {}, {
//           headers: { 'Authorization': `Bearer ${response.data.access_token}` }
//       }).then((response) => {
//           console.log(response.data);
//       })
//   }).catch(ex => console.log(ex))
//   res.end('Auth')
// }
