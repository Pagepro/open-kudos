import { Schema, model } from 'mongoose'

interface ITransfer {
  senderId: string,
  receiverId: string,
  value: number,
  date: Date,
  comment?: string
}

const transferSchema: Schema<ITransfer> = new Schema({
  teamId: {
    type: String,
    trim: true,
    required: 'Team id team id is required'
  },
  senderId: {
    type: String,
    trim: true,
    required: 'Sender id is required'
  },
  receiverId: {
    type: String,
    trim: true,
    required: 'Receiver id is required'
  },
  value: {
    type: Number,
    required: 'Values is required'
  },
  date: {
    type: Date,
    required: 'Date of transaction is required'
  },
  comment: String
})

export default model('Transfer', transferSchema)
