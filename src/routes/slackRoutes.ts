import { Router } from 'express'
import { slackInstallAuth } from '../controllers/auth'
import { searchCommand, executeCommand, events, test } from '../controllers/slashCommand'
const slackRoutes = Router()

slackRoutes.route('/events')
    .post(events)

slackRoutes.route('/commands')
    .post(searchCommand, executeCommand)

slackRoutes.route('/test')
    .get(test)

slackRoutes.route('/redirect')
    .get(slackInstallAuth)

export { slackRoutes }