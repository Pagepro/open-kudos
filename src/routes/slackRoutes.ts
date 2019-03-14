import { Router } from 'express'
import { slackInstallAuth } from '../controllers/auth'
import { searchCommand, executeCommand, test } from '../controllers/slashCommand'
import { events, resetPoints } from '../controllers/slackEvents'
const slackRoutes = Router()

slackRoutes.route('/events')
    .post(events)

slackRoutes.route('/commands')
    .post(searchCommand, executeCommand)

slackRoutes.route('/test')
    .get(test)

slackRoutes.route('/redirect')
    .get(slackInstallAuth)

slackRoutes.route('/reset')
    .get(resetPoints)

export { slackRoutes }