import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'

const CardWrapper = styled.div`
  & .ant-card {
    width:300px;
  }
`
interface IProps {
  title: string
}

const SettingsCard: React.FC<IProps> = (props) => {
  return (
    <CardWrapper>
      <Card title={props.title}>
        {props.children}
      </Card>
    </CardWrapper>
  )
}
export default SettingsCard
