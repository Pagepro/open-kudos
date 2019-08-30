import { dashboardRoutes } from './config'
import { IGlobalState } from './reducers'

export const titles = {
  dashboard: 'Dashboard',
  editGift: 'Edit gift',
  giftRequests: 'Gift requests',
  gifts: 'Gifts',
  list: 'List',
  newGift: 'New gift',
  requests: 'Requests',
  settings: 'Settings',
  team: 'Team',
  title1: 'Title1',
  transfers: 'Transfers',
  users: 'Users'
}

export const pageTitleMapping = {
  [dashboardRoutes.dashboardPage]: (state?: IGlobalState) => titles.dashboard,
  [dashboardRoutes.newGiftPage]: (state?: IGlobalState) => titles.newGift,
  [dashboardRoutes.editGiftPage]: (state?: IGlobalState) => titles.editGift,
  [dashboardRoutes.giftRequestsPage]:
    (state?: IGlobalState) => titles.giftRequests,
  [dashboardRoutes.giftsManagementPage]: (state?: IGlobalState) => titles.gifts,
  [dashboardRoutes.settingPage]: (state?: IGlobalState) => titles.settings,
  [dashboardRoutes.transfersPage]: (state?: IGlobalState) => titles.transfers,
  [dashboardRoutes.teamManagementPage]: (state?: IGlobalState) => titles.team
}

export const settingsCardsTitles = {
  answerChannels: 'Kudos bot answer channel:',
  giftRequestsReceiver: 'Receiver of gift requests:',
  monthlyKudosAmount: 'Amount of Kudos in month:'
}
