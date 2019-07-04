import React, { useState, useEffect } from 'react'
import landingPageTemplate from '../templates/landingPageTemplate'
import axios from 'axios'

const LandingPage: React.FC = () => {
  const [link, setLink] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('api/installation/slackInstallationLink');
      setLink(data.slackInstalHref);
    };

    fetchData();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: landingPageTemplate.format(link) }} />
  )
}

export default LandingPage
