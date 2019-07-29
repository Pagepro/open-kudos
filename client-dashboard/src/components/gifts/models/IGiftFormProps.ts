import { SubmissionErrors } from 'final-form'
import { IFormGift } from './IFormGift'

export interface IGiftFormProps {
  loading: boolean,
  initialValues?: IFormGift,
  onCancel(): void,
  onSubmit(gift: IFormGift): Promise<SubmissionErrors | undefined>,
}
