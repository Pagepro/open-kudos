import { slackAuth } from '../controllers/auth'
import { command } from '../controllers/slashCommand'
import app from '../config/express'

app.route('/')
    .get(slackAuth, command)