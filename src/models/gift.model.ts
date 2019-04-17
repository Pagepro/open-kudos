import { Document, model, Schema } from 'mongoose'

export interface IGift {
  amount?: number,
  name: string,
  description: string,
  teamId: string,
  cost: number,
  isAvailable?: boolean
}

export type IGiftDocument = IGift & Document

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
})

giftSchema.index({
  name: 'text',
  teamId: 'text'
})

export default model<IGiftDocument>('Gift', giftSchema)
