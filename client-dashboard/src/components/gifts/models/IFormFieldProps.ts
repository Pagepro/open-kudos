import React from 'react'
import { FieldInputProps, FieldMetaState } from 'react-final-form'

export interface IFormFieldProps {
  meta: FieldMetaState<any>,
  children: React.ReactNode,
  label?: string
}

export interface IFormInputProps {
  input: FieldInputProps<any, HTMLElement>,
  meta: FieldMetaState<any>,
  defaultValue?: any,
  label?: string
}
