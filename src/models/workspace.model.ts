import { Schema, model } from 'mongoose'

interface IWorkspace {
  teamName: string,
  active: boolean,
  teamId: string,
  accessToken: string,
  botUserId: string,
  botAccessToken: string
}

const workspaceSchema: Schema<IWorkspace> = new Schema({
  teamName: {
    type: String,
    trim: true,
    required: 'Team name is required'
  },
  teamId: {
    type: String,
    trim: true,
    required: 'Team id team id is required'
  },
  active: {
    type: Boolean,
    default: false
  },
  accessToken: {
    type: String,
    trim: true,
    unique: true,
    required: 'Access token is required'
  },
  botUserId: {
    type: String,
    trim: true,
    unique: true,
    required: 'botUserId is required'
  },
  botAccessToken: {
    type: String,
    trim: true,
    unique: true,
    required: 'botAccessToken is required'
  }
})

export default model('Workspace', workspaceSchema)
