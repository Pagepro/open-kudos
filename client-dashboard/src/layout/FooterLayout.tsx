import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout;

const FooterLayout: React.FC = () => {
  const year = new Date().getFullYear()
  const message = `Open Kudos ©${year} Created by Pagepro`

  return (
    <Footer className="footer-container">
      {message}
    </Footer>
  )
}

export default FooterLayout
