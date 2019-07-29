import { Document, model, PaginateModel, Schema } from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
import Gift from './gift.model'

export interface IGiftTransfer {
  userId: string,
  giftId: string,
  teamId: string,
  isNewStatus?: boolean,
  giftRequestDate?: Date,
  giftReceivedDate?: Date,
  giftName?: string,
  giftDescription?: string,
  giftCost?: number
}

export type IGiftTransferDocument = IGiftTransfer & Document
type IGiftTransferModel<T extends Document> = PaginateModel<T>

const giftTransferSchema: Schema<IGiftTransfer> = new Schema({
  giftCost: {
    type: Number,
  },
  giftDescription: {
    trim: true,
    type: String,
  },
  giftId: {
    required: 'Gift id is required',
    trim: true,
    type: String
  },
  giftName: {
    trim: true,
    type: String,
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

giftTransferSchema.pre('save', async function(this: IGiftTransferDocument) {
  const gift = await Gift.findById(this.giftId)
  this.giftName = gift.name
  this.giftDescription = gift.description
  this.giftCost = gift.cost
})

giftTransferSchema.plugin(mongooseAggregatePaginate)

const GiftTransferModel: IGiftTransferModel<IGiftTransferDocument> = model<
  IGiftTransferDocument
>('GiftTransfer', giftTransferSchema) as IGiftTransferModel<
  IGiftTransferDocument
>

export default GiftTransferModel
