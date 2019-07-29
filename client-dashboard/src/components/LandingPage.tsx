import React, { useState, useEffect } from 'react'
import landingPageTemplate from '../templates/landingPageTemplate'
import axios from 'axios'

const LandingPage: React.FC = () => {
  const [link, setLink] = useState(String.empty)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { slackInstalHref } } = await axios.get('api/settings');
      setLink(slackInstalHref);
    };

    fetchData();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: landingPageTemplate.format(link) }} />
  )
}

export default LandingPage
