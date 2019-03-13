import '../models/user.model'
import User, { IUser } from '../models/user.model'

export default class UserService {
  public static create(user: IUser) {
    return User.create(user)
  }
}
