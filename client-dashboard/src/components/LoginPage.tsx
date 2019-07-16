import React, { useState, useEffect } from 'react'
import loginPageTemplate from '../templates/loadingPageTemplate'
import axios from 'axios'

const LoginPage: React.FC = () => {
  const [loginHref, setLoginHref] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const { data: { slackLoginHref } } = await axios.get('api/settings');
      setLoginHref(slackLoginHref)
    };

    fetchData();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: loginPageTemplate.format(loginHref) }} />
  )
}

export default LoginPage

