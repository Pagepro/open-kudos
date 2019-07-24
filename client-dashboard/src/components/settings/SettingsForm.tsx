import { Button, Divider } from 'antd'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { settingsCardsTitles } from '../../setup/messages'
import SelectFinal, { IOption } from '../fields/SelectFinal'
import SettingsCard from './SettingsCard'

interface IProps {
  allChannels: IOption[],
  botResponseChannelId?: string
  onSubmit(data: any): void
}

const SettingsForm = (props: IProps) => (
  <Form
    onSubmit={props.onSubmit}
    initialValues={{
      botResponseChannelId: props.botResponseChannelId
    }}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <SettingsCard
          title={settingsCardsTitles.answerChannels}
        >
          <Field
            name="botResponseChannelId"
            component={SelectFinal({
              options: props.allChannels
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
