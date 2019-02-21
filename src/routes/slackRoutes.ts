import { Router } from 'express'
import { slackAuth } from '../controllers/auth'
import { command, events, test } from '../controllers/slashCommand'
const slackRoutes = Router()

slackRoutes.route('/events')
    .post(events)

slackRoutes.route('/commands')
    .post(command)

slackRoutes.route('/test')
    .get(test)

export { slackRoutes }