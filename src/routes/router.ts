import { Router } from 'express'
import { slackRoutes } from './slackRoutes'
const router = Router()

router.use('/slack', slackRoutes)
router.use('/', (req, res) => { res.end('Success') })

export { router }
