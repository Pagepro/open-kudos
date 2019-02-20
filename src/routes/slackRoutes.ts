import { Router } from 'express'
import { slackAuth } from '../controllers/auth'
import { command, test } from '../controllers/slashCommand'
const slackRoutes = Router()

slackRoutes.route('/')
    .get(slackAuth, command)

slackRoutes.route('/test')
    .post(test)

export { slackRoutes }