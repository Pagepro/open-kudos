import { Document, model, PaginateModel, Schema } from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

export interface ITransfer {
  senderId: string,
  receiverId: string,
  teamId: string,
  value: number,
  comment?: string
}

export type ITransferDocument = ITransfer & Document
type ITransferModel<T extends Document> = PaginateModel<T>

const transferSchema: Schema<ITransfer> = new Schema({
  comment: String,
  date: {
    default: new Date(),
    required: 'Date of transaction is required',
    type: Date
  },
  receiverId: {
    required: 'Receiver id is required',
    trim: true,
    type: String
  },
  senderId: {
    required: 'Sender id is required',
    trim: true,
    type: String
  },
  teamId: {
    required: 'Team id is required',
    trim: true,
    type: String,
  },
  value: {
    min: 0,
    required: 'Values is required',
    type: Number
  }
})

transferSchema.index({
  teamId: 'text'
})

transferSchema.plugin(mongooseAggregatePaginate)

const TransferModel: ITransferModel<ITransferDocument> = model<
  ITransferDocument
>('Transfer', transferSchema) as ITransferModel<
  ITransferDocument
>

export default TransferModel
