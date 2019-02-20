import { Router } from 'express'
const apiRoutes = Router()

apiRoutes.route('/').get()

export { apiRoutes }