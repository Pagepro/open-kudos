import { Button, Divider } from 'antd'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { settingsCardsTitles } from '../../setup/messages'
import Select, { IOption } from '../fields/Select'
import SettingsCard from './SettingsCard'

interface IProps {
  allChannels: IOption[],
  botResponseChannelId?: string
  onSubmit(data: any): void
}

const SettingsForm = ({
  onSubmit,
  botResponseChannelId,
  allChannels
}: IProps) => (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        botResponseChannelId
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <SettingsCard
            title={settingsCardsTitles.answerChannels}
          >
            <Field
              name="botResponseChannelId"
              component={Select({
                options: allChannels
              })}
            />
          </SettingsCard>
          <Divider />
          <Button htmlType='submit'>
            Save settings
          </Button>
        </form>
      )}
    />
  )

export default SettingsForm
