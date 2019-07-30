import { dashboardRoutes } from './config'

export const titles = {
  dashboard: 'Dashboard',
  editGift: 'Edit gift',
  giftRequests: 'Gift requests',
  gifts: 'Gifts',
  list: 'List',
  newGift: 'New gift',
  requests: 'Requests',
  settings: 'Settings',
  title1: 'Title1',
  transfers: 'Transfers'
}

export const pageTitles = {
  [dashboardRoutes.dashboardPage]: titles.dashboard,
  [dashboardRoutes.editGiftPage]: titles.editGift,
  [dashboardRoutes.giftRequestsPage]: titles.giftRequests,
  [dashboardRoutes.giftsManagementPage]: titles.gifts,
  [dashboardRoutes.newGiftPage]: titles.newGift,
  [dashboardRoutes.settingPage]: titles.settings,
  [dashboardRoutes.transfersPage]: titles.transfers,
}

export const settingsCardsTitles = {
  answerChannels: 'Kudos bot answer channel:',
  monthlyKudosAmount: 'Amount of Kudos in month:'
}
