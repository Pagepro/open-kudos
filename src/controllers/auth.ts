import axios from 'axios'
import {
  NextFunction,
  Request,
  Response,
} from 'express'
import { insertWorkspace } from '../services/db/workspace'

function slackInstallAuth(req: Request, res: Response, next: NextFunction) {
  axios.get('https://slack.com/api/oauth.access', {
    params: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code,
    }
  }).then((response) => {
    insertWorkspace(response.data)
  })
  res.end('Success')
}

export { slackInstallAuth }
