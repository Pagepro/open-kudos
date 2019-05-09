import { Document, model, Schema } from 'mongoose'

export interface ISubscription {
  startDate?: Date,
  endDate?: Date,
  teamId: string,
  isValid?: boolean
}

type ISubscriptionDocument = ISubscription & Document
const DEMO_DAYS_PERIOD = 30
const subscriptionSchema: Schema<ISubscriptionDocument> = new Schema({
  endDate: {
    default: () =>
      new Date().getTime() + DEMO_DAYS_PERIOD * 24 * 60 * 60 * 1000,
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

subscriptionSchema.virtual('isValid').get(function () {
  return this.endDate.getTime() >= new Date().getTime()
})

subscriptionSchema.index({
  teamId: 'text'
})

export default model<ISubscriptionDocument>('Subscription', subscriptionSchema)
