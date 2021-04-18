const routes = {
  auth: '/auth',
  dashboardPage: '/dashboard',
  login: '/login',
  root: '/'
}

const infoRoutes = {
  installationPage: `/installation`,
  landingPage: routes.root
}

const dashboardRoutes = {
  dashboardPage: `${routes.dashboardPage}/dashboard`,
  giveKudosPage: `${routes.dashboardPage}/giveKudos`,
  newGiftPage: `${routes.dashboardPage}/gifts/new`,
  editGiftPage: `${routes.dashboardPage}/gifts/:id`,
  giftRequestsPage: `${routes.dashboardPage}/gifts/requests`,
  giftsManagementPage: `${routes.dashboardPage}/gifts`,
  settingPage: `${routes.dashboardPage}/settings`,
  transfersPage: `${routes.dashboardPage}/transfers`,
  teamManagementPage: `${routes.dashboardPage}/team`,
  usersNoKudos: `${routes.dashboardPage}/users/noKudos`
}

const authRoutes = {
  authSuccess: `${routes.auth}/success/:accessToken`
}

export {
  routes,
  authRoutes,
  infoRoutes,
  dashboardRoutes
}
