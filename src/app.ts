import { attachControllers } from '@decorators/express'
import * as bodyParser from 'body-parser'
import express from 'express'
import ConfigurationService from './common/services/configuration'
import DbService from './common/services/db'
import BotInstallationController from './controllers/botInstallationController'
import SlackController from './controllers/slackController'

class App {
  public expressApp: express.Application
  private router: express.Router = express.Router()

  constructor() {
    this.expressApp = express()

    this.configureMiddlewares()
    this.configureRoutes()
    this.configureCronTasks()
    this.connectToDatabase()
  }

  private configureMiddlewares(): void {
    this.expressApp.use(bodyParser.json())
    this.expressApp.use(bodyParser.urlencoded({
      extended: true
    }))
  }

  private configureRoutes(): void {
    attachControllers(this.router, [
      SlackController,
      BotInstallationController,
    ])

    this.expressApp.use('/api', this.router)
  }

  private configureCronTasks(): void {
    const configurationService = new ConfigurationService()
    configurationService.setResetKudosTask()
  }

  private connectToDatabase(): void {
    const dbService = new DbService()
    dbService.connect()
  }
}

const appInstance = new App()

export default appInstance
