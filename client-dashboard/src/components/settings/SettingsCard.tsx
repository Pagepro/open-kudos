import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'

const StyledCard = styled(Card)`
    width:300px;
`
interface IProps {
  title: string
}

const SettingsCard: React.FC<IProps> = (props) => {
  return (
    <StyledCard title={props.title}>
      {props.children}
    </StyledCard>
  )
}

export default SettingsCard
