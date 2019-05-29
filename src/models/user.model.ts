import { Document, model, Schema } from 'mongoose'

export interface IUser {
  userId: string,
  teamId: string,
  kudosGiveable?: number,
  kudosGranted?: number,
  kudosSpendable?: number,
  name?: string,
  realName?: string,
  isAdmin: boolean,
  email?: string
}

type IUserDocument = IUser & Document

const userSchema = new Schema<IUser>({
  email: {
    trim: true,
    type: String
  },
  isAdmin: {
    default: false,
    type: Boolean
  },
  kudosGiveable: {
    default: 100,
    min: 0,
    type: Number,
  },
  kudosGranted: {
    default: 0,
    min: 0,
    type: Number
  },
  kudosSpendable: {
    default: 0,
    min: 0,
    type: Number
  },
  name: {
    trim: true,
    type: String
  },
  realName: {
    trim: true,
    type: String
  },
  teamId: {
    required: 'Slack team id is required',
    trim: true,
    type: String
  },
  userId: {
    required: 'Slack user id is required',
    trim: true,
    type: String
  }
})

userSchema.index({ teamId: 1, userId: 1 }, { unique: true })
export default model<IUserDocument>('User', userSchema)
