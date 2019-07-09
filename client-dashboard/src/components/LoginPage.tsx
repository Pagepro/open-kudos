import React, { useState, useEffect } from 'react'
import loginPageTemplate from '../templates/loadingPageTemplate'
import axios from 'axios'

const LoginPage: React.FC = () => {
  const [clientId, setClientId] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const { data: { slackClientId } } = await axios.get('api/installation/slackClientId')
      setClientId(slackClientId)
    };

    fetchData();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: loginPageTemplate.format(clientId) }} />
  )
}

export default LoginPage

