const routes = {
  root: '/',
  dashboardPage: '/dashboard',
  auth: '/auth',
  login: '/login'
}

const infoRoutes = {
  landingPage: routes.root,
  installationPage: `/installation`
}

const dashboardRoutes = {
  giftsManagementPage: `${routes.dashboardPage}/gifts`,
  usersManagementPage: `${routes.dashboardPage}/users`,
  settingPage: `${routes.dashboardPage}/settings`
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
