import { Request, Response, NextFunction } from 'express'
import { insertWorkspace } from '../services/db/workspace'
import axios from 'axios'

function slackInstallAuth(req: Request, res: Response, next: NextFunction) {
    axios.get('https://slack.com/api/oauth.access', {
        params: {
            code: req.query.code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        }
    }).then((response) => {
        insertWorkspace(response.data)
    })
    res.end('Success')
}

export { slackInstallAuth }
