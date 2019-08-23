import { Document, model, PaginateModel, Schema } from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

export interface IGift {
  amount?: number,
  name: string,
  description: string,
  teamId: string,
  cost: number,
  isAvailable?: boolean,
  imgUrl?: string
}

export type IGiftDocument = IGift & Document
type IGiftModel<T extends Document> = PaginateModel<T>

const giftSchema: Schema<IGift> = new Schema({
  amount: {
    default: 1,
    type: Number
  },
  cost: {
    required: 'Gift cost is required',
    type: Number,
  },
  description: {
    default: 'No description',
    trim: true,
    type: String,
  },
  isAvailable: {
    default: true,
    type: Boolean
  },
  name: {
    required: 'Gift name is required',
    trim: true,
    type: String,
  },
  teamId: {
    required: 'Team id is required',
    trim: true,
    type: String,
  },
  imgUrl: {
    trim: true,
    type: String,
  }
})

giftSchema.index({
  name: 'text',
  teamId: 'text'
})

giftSchema.plugin(mongooseAggregatePaginate)

const GiftModel: IGiftModel<IGiftDocument> = model<IGiftDocument>(
  'Gift',
  giftSchema
) as IGiftModel<IGiftDocument>

export default GiftModel
