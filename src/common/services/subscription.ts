import '../../models/subscription.model'
import Subscription from '../../models/subscription.model'

export default class SubscriptionService {
  public async create(teamId: string) {
    const subscription = await Subscription.findOne({ teamId })

    if (!subscription) {
      return Subscription.create({ teamId })
    } else if (subscription.isValid) {
      return Subscription.findOneAndUpdate(
        { teamId },
        { teamId },
        {
          setDefaultsOnInsert: true,
          upsert: true,

        }
      )
    } else {
      throw new Error('Subscription expired!')
    }
  }

  public async checkIfValid(teamId: string) {
    const subscription = await Subscription.findOne({ teamId })
    return subscription.isValid
  }
}
