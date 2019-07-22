import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import React from 'react'
import { FieldRenderProps } from 'react-final-form'

export interface IOption {
  value: string
  label: string
}

interface IOwnProps {
  options: IOption[]
}

type IProps = SelectProps<string> & IOwnProps

const SelectFinal = ({ options, ...selectProps }: IProps): React.SFC<
  FieldRenderProps<string, HTMLSelectElement>
> => ({ input }) => (
  <Select<string>
    {...selectProps}
    value={input.value}
    onChange={input.onChange}
  >
    {options.map(({ value, label }) => (
      <Select.Option key={value} value={value}>
        {label}
      </Select.Option>
    ))}
  </Select>
)

export default SelectFinal
