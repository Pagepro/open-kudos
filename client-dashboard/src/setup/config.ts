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
  newGiftPage: `${routes.dashboardPage}/gifts/new`,
  editGiftPage: `${routes.dashboardPage}/gifts/:id`,
  giftRequestsPage: `${routes.dashboardPage}/gifts/requests`,
  giftsManagementPage: `${routes.dashboardPage}/gifts`,
  settingPage: `${routes.dashboardPage}/settings`,
  transfersPage: `${routes.dashboardPage}/transfers`,
  usersManagementPage: `${routes.dashboardPage}/users`,
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
