import axios from 'axios'
import {
  Request,
  Response,
} from 'express'
import Config from '../common/consts/config'
import SlackConsts from '../common/consts/slack'
import { insertWorkspace } from '../services/db/workspace'

const slackInstallAuth = async (req: Request, res: Response) => {
  const { data } = await axios.get(SlackConsts.skackAuthUrl, {
    params: {
      client_id: Config.clientId,
      client_secret: Config.clientSecret,
      code: req.query.code,
    }
  })

  insertWorkspace(data)

  res.end('Success')
}

export { slackInstallAuth }
