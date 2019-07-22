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
interface IGiftTransferModel<T extends Document> extends PaginateModel<T> {}

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

giftTransferSchema.pre('save', async function() {
  const currentDocument = this as IGiftTransferDocument
  const gift = await Gift.findById(currentDocument.giftId)

  currentDocument.giftName = gift.name
  currentDocument.giftDescription = gift.description
  currentDocument.giftCost = gift.cost
})

giftTransferSchema.plugin(mongooseAggregatePaginate)

const GiftTransferModel: IGiftTransferModel<IGiftTransferDocument> = model<
  IGiftTransferDocument
>('GiftTransfer', giftTransferSchema) as IGiftTransferModel<
  IGiftTransferDocument
>

export default GiftTransferModel
