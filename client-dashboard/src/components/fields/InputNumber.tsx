import { InputNumber as AntdInputNumber } from 'antd'
import React from 'react'
import { FieldInputProps } from 'react-final-form'

const InputNumber =
  ({ input }: { input: FieldInputProps<number, HTMLInputElement> }) => (
    <AntdInputNumber
      value={input.value}
      onChange={input.onChange}
    />
  )

export default InputNumber
