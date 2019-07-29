import { Document, model, Schema } from 'mongoose'
import CommonConst from '../common/consts/common'

export interface ISubscription {
  startDate?: Date,
  endDate?: Date,
  teamId: string,
  isValid?: boolean
}

type ISubscriptionDocument = ISubscription & Document

const subscriptionSchema: Schema<ISubscriptionDocument> = new Schema({
  endDate: {
    default: () =>
      new Date().getTime() + CommonConst.demoDaysPeriod * 24 * 60 * 60 * 1000,
    type: Date
  },
  startDate: {
    default: Date.now(),
    type: Date
  },
  teamId: {
    required: true,
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
