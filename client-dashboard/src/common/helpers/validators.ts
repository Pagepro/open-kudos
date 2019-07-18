import { FieldValidator } from 'final-form'

const required: FieldValidator<any> = (value: any) =>
  value ? undefined : 'Field is required'

const mustBeNumber: FieldValidator<number> = (value: number) =>
  isNaN(value) ? 'Must be a number' : undefined

const minValue = (min: number) => (value: number) =>
  isNaN(value) || value >= min
    ? undefined
    : `Should be greater than ${min - 1}`

const composeValidators: FieldValidator<any> = (...validators: any) => (
  value: any
) =>
  validators.reduce(
    (error: any, validator: any) => error || validator(value),
    undefined
  )

export { required, mustBeNumber, minValue, composeValidators }
