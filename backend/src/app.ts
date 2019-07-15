import { attachControllers } from '@decorators/express'
import * as bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import ConfigurationService from './common/services/configuration'
import DbService from './common/services/db'
import AuthController from './controllers/authController'
import BotInstallationController from './controllers/botInstallationController'
import DashboardGiftsController from './controllers/dashboardGiftsController'
import DashboardPageController from './controllers/dashboardPageController'
import LandingPageController from './controllers/landingPageController'
import SettingsController from './controllers/settingsController'
import SlackController from './controllers/slackController'

class App {
  public expressApp: express.Application
  private configurationService = new ConfigurationService()
  private dbService = new DbService()
  private APIRouter: express.Router = express.Router()
  private authRouter: express.Router = express.Router()
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
      DashboardPageController,
      LandingPageController
    ])

    attachControllers(this.APIRouter, [
      SlackController,
      BotInstallationController,
      SettingsController,
      DashboardGiftsController
    ])

    attachControllers(this.authRouter, [
      AuthController
    ])

    this.expressApp.use(express.static(path.join(__dirname, './frontend')))
    this.expressApp.use('/api', this.APIRouter)
    this.expressApp.use('/auth', this.authRouter)
    this.expressApp.use('*', this.router)
  }

  private configureCronTasks(): void {
    this.configurationService.setResetKudosTask()
  }

  private connectToDatabase(): void {
    this.dbService.connect()
  }
}

const appInstance = new App()

export default appInstance
