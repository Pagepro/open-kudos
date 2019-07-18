import { Icon } from 'antd'
import React from 'react'

interface IProps {
  className?: string
  iconName: string
  title: string
}

const TitleIcon: React.FC<IProps> = ({ className, iconName, title }) => {
  return (
    <span className={className}>
      <Icon type={iconName} />
      <span>
        {title || 'hello'}
      </span>
    </span>
  )
}

export default TitleIcon
