import { Router } from 'express'
import { slackAuth } from '../controllers/auth'
import { searchCommand, executeCommand, events, test } from '../controllers/slashCommand'
const slackRoutes = Router()

slackRoutes.route('/events')
    .post(events)

slackRoutes.route('/commands')
    .post(searchCommand, executeCommand)

slackRoutes.route('/test')
    .get(test)

export { slackRoutes }