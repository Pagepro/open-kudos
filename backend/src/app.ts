import { attachControllers } from '@decorators/express'
import * as bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import Config from './common/consts/config'
import ConfigurationService from './common/services/configuration'
import DbService from './common/services/db'
import AuthController from './controllers/authController'
import BotInstallationController from './controllers/botInstallationController'
import ChannelsController from './controllers/channelsController'
import DashboardPageController from './controllers/dashboardPageController'
import GiftsController from './controllers/giftsController'
import LandingPageController from './controllers/landingPageController'
import SettingsController from './controllers/settingsController/settingsController'
import SlackController from './controllers/slackController'
import TestController from './controllers/testController'
import UserController from './controllers/userController'

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
      GiftsController,
      UserController,
      ChannelsController,
      ...(Config.isProduction ? [] : [TestController])
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
