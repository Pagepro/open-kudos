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
  editGiftPage: `${routes.dashboardPage}/gifts/:id`,
  giftRequestsPage: `${routes.dashboardPage}/gifts/requests`,
  giftsManagementPage: `${routes.dashboardPage}/gifts`,
  newGiftPage: `${routes.dashboardPage}/gifts/new`,
  settingPage: `${routes.dashboardPage}/settings`,
  transfersPage: `${routes.dashboardPage}/transfers`,
  usersManagementPage: `${routes.dashboardPage}/users`
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
