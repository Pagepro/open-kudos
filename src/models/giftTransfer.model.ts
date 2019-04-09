import { Document, model, Schema } from 'mongoose'

export interface IGiftTransfer {
  userId: string,
  giftId: string,
  teamId: string,
  isNewStatus?: boolean,
  giftRequestDate?: Date,
  giftReceivedDate?: Date,
}

type IGiftTransferDocument = IGiftTransfer & Document

const giftTransferSchema: Schema<IGiftTransfer> = new Schema({
  giftId: {
    required: 'Gift id is required',
    trim: true,
    type: String
  },
  giftReceivedDate: {
    type: Date
  },
  giftRequestDate: {
    default: new Date(),
    type: Date
  },
  isNewStatus: {
    default: true,
    type: Boolean
  },
  teamId: {
    required: 'Team id is required',
    trim: true,
    type: String,
  },
  userId: {
    required: 'User id is required',
    trim: true,
    type: String
  },
})

giftTransferSchema.index({
  giftId: 'text',
  teamId: 'text',
  userId: 'text'
})

export default model<IGiftTransferDocument>('GiftTransfer', giftTransferSchema)
