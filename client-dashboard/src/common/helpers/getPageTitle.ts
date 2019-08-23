import { matchPath } from 'react-router-dom'
import { dashboardRoutes } from '../../setup/config'
import { pageTitleMapping, titles } from '../../setup/messages'
import { IGlobalState } from '../../setup/reducers'

export const getTitleByPath = (path: string, state?: IGlobalState): string => {
  for (const obj of Object.entries(dashboardRoutes)) {
    const route = obj[1]
    const isMatch = matchPath(path, route)
    if (isMatch && isMatch.isExact) {
      return pageTitleMapping[route](state) || titles.dashboard
    }
  }
  return titles.dashboard
}
