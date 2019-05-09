import { Document, model, Schema } from 'mongoose'

export interface ISubscription {
  startDate?: Date,
  endDate?: Date,
  teamId: string
}

type ISubscriptionDocument = ISubscription & Document
const DEMO_PERIOD = 30
const subscriptionSchema: Schema<ISubscriptionDocument> = new Schema({
  endDate: {
    default: () => new Date().getTime() + DEMO_PERIOD * 24 * 60 * 60 * 1000,
    type: Date
  },
  startDate: {
    default: Date.now(),
    type: Date
  },
  teamId: {
    required: 'Team id is required',
    trim: true,
    type: String,
  },
})

subscriptionSchema.index({
  teamId: 'text'
})

export default model<ISubscriptionDocument>('Subscription', subscriptionSchema)
