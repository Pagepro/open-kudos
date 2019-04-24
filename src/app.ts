import { attachControllers } from '@decorators/express'
import * as bodyParser from 'body-parser'
import ejs from 'ejs'
import express from 'express'
import ConfigurationService from './common/services/configuration'
import DbService from './common/services/db'
import BotInstallationController from './controllers/botInstallationController'
import LandingPageController from './controllers/landingPageController'
import SlackController from './controllers/slackController'

class App {
  public expressApp: express.Application
  private configurationService = new ConfigurationService()
  private dbService = new DbService()
  private router: express.Router = express.Router()
  private landingPageRouter: express.Router = express.Router()

  constructor() {
    this.expressApp = express()

    this.configureMiddlewares()
    this.configureRoutes()
    this.configureCronTasks()
    this.connectToDatabase()
    this.setViewEngine()
  }

  private configureMiddlewares(): void {
    this.expressApp.use(bodyParser.json())
    this.expressApp.use(bodyParser.urlencoded({
      extended: true
    }))
  }

  private configureRoutes(): void {
    attachControllers(this.landingPageRouter, [
      LandingPageController
    ])

    attachControllers(this.router, [
      SlackController,
      BotInstallationController,
    ])

    this.expressApp.use('/', this.landingPageRouter)
    this.expressApp.use('/api', this.router)
  }

  private configureCronTasks(): void {
    this.configurationService.setResetKudosTask()
  }

  private connectToDatabase(): void {
    this.dbService.connect()
  }

  private setViewEngine(): void {
    this.expressApp.set('views', `${__dirname}/views`)
    this.expressApp.set('view engine', 'ejs')
  }
}

const appInstance = new App()

export default appInstance
