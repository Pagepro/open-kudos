import React from 'react'
import successInstallationPageTemplate from '../templates/successInstallationTemplate'

const SuccessInstallationPage: React.FC = () =>
  <div dangerouslySetInnerHTML={{ __html: successInstallationPageTemplate }} />

export default SuccessInstallationPage
