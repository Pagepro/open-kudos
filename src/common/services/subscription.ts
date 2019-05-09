import '../../models/subscription.model'
import Subscription from '../../models/subscription.model'

export default class SubscriptionService {
  public create(teamId: string) {
    return Subscription.create({ teamId })
  }
}
