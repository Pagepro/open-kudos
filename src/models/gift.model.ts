import { Document, model, Schema } from 'mongoose'

export interface IGift {
  name: string,
  description: string,
  cost: number,
  isAvailable?: boolean
}

type IGiftDocument = IGift & Document

const giftSchema: Schema<IGift> = new Schema({
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
})

giftSchema.index({
  name: 'text'
})

export default model<IGiftDocument>('Gift', giftSchema)
