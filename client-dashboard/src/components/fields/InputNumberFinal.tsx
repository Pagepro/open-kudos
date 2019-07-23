import { InputNumber } from 'antd'
import React from 'react'
import { FieldInputProps, FieldRenderProps } from 'react-final-form'

const InputNumberFinal =
  ({ input }: { input: FieldInputProps<number, HTMLInputElement> }) => (
    <InputNumber
      value={input.value}
      onChange={input.onChange}
    />
  )

export default InputNumberFinal
