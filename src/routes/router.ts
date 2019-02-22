import { Router } from 'express'
import { slackRoutes } from './slackRoutes'
import { apiRoutes } from './api';
const router = Router()

router.use('/slack', slackRoutes)
router.use('/api', apiRoutes)
router.use('/', (req, res) => { res.end('Success') })

export { router }
