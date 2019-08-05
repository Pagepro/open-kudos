import { Button, Col, Input, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import { Field, Form } from 'react-final-form'
import {
  composeValidators,
  fileKbSizeValid,
  minValue,
  required
} from '../../common/helpers/validators'
import './GiftForm.scss'
import { IFormFieldProps, IFormInputProps, IGiftFormProps } from './models'

/* tslint:disable: object-literal-sort-keys */
const labelColSize = {
  xs: 24,
  md: 5,
  lg: 3,
  xxl: 2
}

const inputColSize = {
  md: 15,
  lg: 12,
  xxl: 8,
}
/* tslint:enable: object-literal-sort-keys */

const FormField = ({ meta, label, children }: IFormFieldProps) => (
  <Row className='form__field'>
    <Col {...labelColSize}>
      <label>{label}</label>
    </Col>
    <Col {...inputColSize}>
      {children}
      {(meta.error || meta.submitError) && meta.touched && (
        <span className='text-danger'>{meta.error || meta.submitError}</span>
      )}
    </Col>
  </Row>
)

const renderInput = ({
  input,
  meta,
  label
}: IFormInputProps) => (
    <FormField meta={meta} label={label}>
      <Input {...input} />
    </FormField>
  )

const renderTextArea = ({
  input,
  meta,
  label
}: IFormInputProps) => (
    <FormField meta={meta} label={label}>
      <TextArea {...input} />
    </FormField>
  )

const renderFileInput = ({
  input,
  meta,
  label
}: IFormInputProps) => (
    <FormField meta={meta} label={label}>
      <input type="file"
        accept="image/*"
        onChange={e => input.onChange(e.target.files)}
      />
    </FormField>
  )

const GiftForm = ({
  onSubmit,
  onCancel,
  loading,
  initialValues
}: IGiftFormProps) => (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name='name' validate={required<string>()}>
            {({ input, meta }) => renderInput({
              input,
              label: 'Name',
              meta
            })}
          </Field>
          <Field name='description'>
            {({ input, meta }) => renderTextArea({
              input,
              label: 'Description',
              meta
            })}
          </Field>
          <Field
            name='cost'
            type='number'
            validate={composeValidators(required(), minValue(1))}
          >
            {({ input, meta }) => renderInput({
              input,
              label: 'Cost',
              meta
            })}
          </Field>
          <Field
            type='file'
            name='files'
            validate={fileKbSizeValid(80)}
          >
            {({ input, meta }) => renderFileInput({
              input,
              label: 'Image',
              meta
            })}
          </Field>
          <Row className='form__buttons'>
            <Button type='primary' htmlType='submit' loading={loading}>
              Save
          </Button>
            <Button
              htmlType='button'
              onClick={onCancel}
              className='form__button--add'
            >
              Cancel
          </Button>
          </Row>
        </form>
      )}
    />
  )

export default GiftForm
