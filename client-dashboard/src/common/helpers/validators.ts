import { FieldValidator } from 'final-form'

const required = <T>(): FieldValidator<T> => (value: any) =>
  value ? undefined : 'Field is required'

const mustBeNumber: FieldValidator<number> = (value: number) =>
  isNaN(value) ? 'Must be a number' : undefined

const minValue = (min: number) => (value: number) =>
  isNaN(value) || value >= min
    ? undefined
    : `Should be greater than ${min - 1}`

const composeValidators = <T>(...validators: Array<FieldValidator<T>>) => (
  value: T,
  allValues: object,
) =>
  validators.reduce(
    (error, validator) =>
      error || validator(value, allValues),
    ''
  )

const fileKbSizeValid = (kbSize: number) => (value: FileList) => {
  if (value && value.length) {
    return value[0].size <= (kbSize * 1000) ?
      undefined :
      `File larger than ${kbSize} KB`
  }
}

export { required, mustBeNumber, minValue, composeValidators, fileKbSizeValid }
