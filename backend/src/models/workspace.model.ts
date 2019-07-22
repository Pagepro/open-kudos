import { Document, model, Schema } from 'mongoose'

export interface IWorkspace {
  teamName: string,
  active?: boolean,
  teamId: string,
  accessToken: string,
  botUserId: string,
  botAccessToken: string,
  botResponseChannelId?: string
}

type IWorkspaceDocument = IWorkspace & Document

const workspaceSchema: Schema<IWorkspace> = new Schema({
  accessToken: {
    required: 'Access token is required',
    trim: true,
    type: String,
    unique: true,
  },
  active: {
    default: true,
    type: Boolean
  },
  botAccessToken: {
    required: 'botAccessToken is required',
    trim: true,
    type: String,
    unique: true,
  },
  botResponseChannelId: {
    trim: true,
    type: String
  },
  botUserId: {
    required: 'botUserId is required',
    trim: true,
    type: String,
    unique: true,
  },
  teamId: {
    required: 'Team id team id is required',
    trim: true,
    type: String
  },
  teamName: {
    required: 'Team name is required',
    trim: true,
    type: String
  }
})

export default model<IWorkspaceDocument>('Workspace', workspaceSchema)
