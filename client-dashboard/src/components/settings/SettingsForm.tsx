import { Button, Divider } from 'antd'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { settingsCardsTitles } from '../../setup/messages'
import InputNumber from '../fields/InputNumber'
import Select, { IOption } from '../fields/Select'
import SettingsCard from './SettingsCard'

interface IProps {
  allChannels: IOption[],
  botResponseChannelId?: string,
  monthlyKudosAmount?: number
  onSubmit(data: any): void
}

const SettingsForm = ({
  allChannels,
  botResponseChannelId,
  monthlyKudosAmount,
  onSubmit
}: IProps) => (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        botResponseChannelId,
        monthlyKudosAmount
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
          <SettingsCard
            title={settingsCardsTitles.monthlyKudosAmount}
          >
            <Field
              name="monthlyKudosAmount"
              component={InputNumber}
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
