import { Button, Divider } from 'antd'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { settingsCardsTitles } from '../../setup/messages'
import InputNumber from '../fields/InputNumber'
import Select, { IOption } from '../fields/Select'
import SettingsCard from './SettingsCard'

interface IProps {
  allChannels: IOption[],
  allAdmins: IOption[],
  botResponseChannelId?: string,
  monthlyKudosAmount?: number,
  giftRequestsReceiver?: string,
  onSubmit(data: any): void
}

const SettingsForm = ({
  allChannels,
  allAdmins,
  botResponseChannelId,
  monthlyKudosAmount,
  giftRequestsReceiver,
  onSubmit
}: IProps) => (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        botResponseChannelId,
        giftRequestsReceiver,
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
          <SettingsCard
            title={settingsCardsTitles.giftRequestsReceiver}
          >
            <Field
              name="giftRequestsReceiver"
              component={Select({
                options: allAdmins
              })}
            />
          </SettingsCard>
          <Divider />
          <Button
            type="primary"
            htmlType='submit'
          >
            Save settings
          </Button>
        </form>
      )}
    />
  )

export default SettingsForm
