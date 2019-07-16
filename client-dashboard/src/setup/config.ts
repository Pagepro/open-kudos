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
  giftsManagementPage: `${routes.dashboardPage}/gifts`,
  settingPage: `${routes.dashboardPage}/settings`,
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
