import axios from 'axios'
import {
  Request,
  Response,
} from 'express'
import Config from '../common/consts/config'
import SlackConsts from '../common/consts/slack'
import WorkspaceService from '../common/services/workspace'

const slackInstallAuth = async (req: Request, res: Response) => {
  const workspaceService = new WorkspaceService()
  const { data } = await axios.get(SlackConsts.slackAuthUrl, {
    params: {
      client_id: Config.clientId,
      client_secret: Config.clientSecret,
      code: req.query.code,
    }
  })

  workspaceService.create(data)

  res.end('Success')
}

export { slackInstallAuth }
