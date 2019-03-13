import { Schema, model } from 'mongoose'

interface IUser {
  userId: string,
  kudosGiveable: number,
  kudosGranted: number,
  kudosSpendable: number,
  name: string,
  realName: string,
  isAdmin: boolean
}

const userSchema: Schema<IUser> = new Schema({
  userId: {
    type: String,
    trim: true,
    required: 'Slack user id is required'
  },
  teamId: {
    type: String,
    trim: true,
    required: 'Slack team id is required'
  },
  kudosGiveable: {
    type: Number,
    default: 100,
    min: 0
  },
  kudosGranted: {
    type: Number,
    default: 0,
    min: 0
  },
  kudosSpendable: {
    type: Number,
    default: 0,
    min: 0
  },
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  realName: {
    type: String,
    trim: true,
    required: 'Real name is required'
  },
  isAdmin: {
    type: Boolean,
    default: false
  }

})

export default model('User', userSchema)
