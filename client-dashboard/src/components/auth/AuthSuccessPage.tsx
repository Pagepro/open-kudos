import React, { useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import { routes } from '../../setup/config'
import { useDispatch } from 'react-redux'
import { addToken } from './actions';

interface IAccessTokenParams {
  accessToken: string
}

const AuthSuccessPage: React.FC<RouteComponentProps<IAccessTokenParams>> = (props) => {
  const { accessToken } = props.match.params
  const dispatch = useDispatch()

  useEffect(() => {
    addToken(accessToken)(dispatch)
  })

  return (
    <Redirect to={routes.dashboardPage} />
  )
}

export default withRouter(AuthSuccessPage)
