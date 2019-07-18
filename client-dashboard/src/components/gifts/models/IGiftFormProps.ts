import { SubmissionErrors } from 'final-form'
import { IFormGift } from './IFormGift'

export interface IGiftFormProps extends IFormGift {
  loading: boolean,
  onCancel(): void,
  onSubmit(gift: IFormGift): Promise<SubmissionErrors | undefined>
}
