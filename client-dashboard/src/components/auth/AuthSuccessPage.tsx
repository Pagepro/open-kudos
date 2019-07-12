import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import { routes } from '../../setup/config';
import { common } from '../../setup/const';

interface IAccessTokenParams {
  accessToken: string
}

const AuthSuccessPage: React.FC<RouteComponentProps<IAccessTokenParams>> = (props) => {
  const { accessToken } = props.match.params

  localStorage.setItem(common.accessTokenKey, accessToken);

  return (
    <Redirect to={routes.dashboardPage} />
  )
}

export default withRouter(AuthSuccessPage)
