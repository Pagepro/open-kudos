import { Button, Divider } from 'antd'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { settingsCardsTitles } from '../../setup/messages'
import InputNumber from '../fields/InputNumber'
import InputString from '../fields/InputString'
import Select, { IOption } from '../fields/Select'
import SettingsCard from '../settings/SettingsCard'

interface IProps {
    teamMembers: IOption[],
    kudosReceiver?: string,
    kudosAmount?: number,
    kudosReason?: string,
    onSubmit(data: any): void
}

const GiveKudosForm = ({
    teamMembers,
    kudosReceiver,
    kudosAmount,
    kudosReason,
    onSubmit
}: IProps) => (
    <Form
        onSubmit={onSubmit}
        initialValues={{
            kudosReceiver,
            kudosAmount,
            kudosReason
        }}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <SettingsCard
                    title={settingsCardsTitles.kudosReceiver}
                >
                    <Field
                        name="kudosReceiver"
                        component={Select({
                            options: teamMembers
                        })}
                    />
                </SettingsCard>

                <SettingsCard
                    title={settingsCardsTitles.kudosAmount}
                >
                    <Field
                        name="kudosAmount"
                        component={InputNumber}
                    />
                </SettingsCard>

                <SettingsCard
                    title={settingsCardsTitles.kudosReason}
                >
                    <Field
                        name="kudosReason"
                        component={InputString}
                    />
                </SettingsCard>

                <Divider />
                <Button
                    type="primary"
                    htmlType='submit'
                >
                    Give
                </Button>
            </form>
        )}
    />
)

export default GiveKudosForm
