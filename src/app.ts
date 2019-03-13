import { attachControllers } from '@decorators/express'
import * as bodyParser from 'body-parser'
import express from 'express'
import TestController from './controllers/testController'

class App {
  public expressApp: express.Application
  private router: express.Router = express.Router()

  constructor() {
    this.expressApp = express()

    this.configureMiddleware()
    this.configureRoutes()
  }

  private configureMiddleware(): void {
    this.expressApp.use(bodyParser.json())
    this.expressApp.use(bodyParser.urlencoded({
      extended: false
    }))
  }

  private configureRoutes(): void {
    attachControllers(this.router, [
      TestController
    ])

    this.expressApp.use('/api', this.router)
  }
}

const appInstance = new App()

export default appInstance