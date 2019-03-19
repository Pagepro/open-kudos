import { Document, model, Schema } from 'mongoose'

export interface ITransfer {
  senderId: string,
  receiverId: string,
  teamId: string,
  value: number,
  comment?: string
}

type ITransferDocument = ITransfer & Document

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
    required: 'Team id team id is required',
    trim: true,
    type: String,
  },
  value: {
    required: 'Values is required',
    type: Number
  }
})

export default model<ITransferDocument>('Transfer', transferSchema)
