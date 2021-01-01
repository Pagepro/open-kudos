import { Input as AntdInputString } from 'antd'
import React from 'react'
import { FieldInputProps } from 'react-final-form'

const InputString =
  ({ input }: { input: FieldInputProps<string, HTMLInputElement> }) => (
    <AntdInputString
      value={input.value}
      onChange={input.onChange}
    />
  )

export default InputString
