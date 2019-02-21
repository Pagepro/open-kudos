import { Router } from 'express'
import { slackAuth } from '../controllers/auth'
import { command, events } from '../controllers/slashCommand'
const slackRoutes = Router()

slackRoutes.route('/events')
    .post(events)

slackRoutes.route('/commands')
    .post(command)

export { slackRoutes }