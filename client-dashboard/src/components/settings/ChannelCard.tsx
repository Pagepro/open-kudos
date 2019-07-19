import { Card, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { settingsCardsTitles } from '../../setup/messages'
import { IGlobalState } from '../../setup/reducers'
import { getChannels, IChannel } from './actions'

const SelectWrapper = styled.div`
  & .ant-select {
    min-width:200px;
    width:100%;
  }
`
const CardWrapper = styled.div`
  & .ant-card {
    width:300px;
  }
`

const { Option } = Select

const renderOption = (channel: IChannel) =>
  <Option key={channel.id} value={channel.id}>
    {channel.name}
  </Option>

const ChanelCard: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState(String.empty)
  const dispatch = useDispatch()

  useEffect(() => {
    getChannels()(dispatch)
  }, [])

  const changeChannel = useCallback(async (channel: string) => {
    await setSelectedChannel(channel)
    console.log(selectedChannel)
  }, [])

  const allChannels =
    useSelector<IGlobalState, IChannel[]>(({ channels }) => channels)

  return (
    <CardWrapper>
      <Card title={settingsCardsTitles.answerChannels}>
        <SelectWrapper>
          <Select
            onChange={changeChannel}
            placeholder='Choice slack channel'
          >
            {allChannels.map(renderOption)}
          </Select>
        </SelectWrapper>
      </Card>
    </CardWrapper>
  )
}
export default ChanelCard
