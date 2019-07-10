const routes = {
  root: '/',
  dashboardPage: '/dashboard',
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

export {
  routes,
  infoRoutes,
  dashboardRoutes
}
