import { Document, model, Schema } from 'mongoose'

export interface IWorkspace {
  teamName: string,
  active: boolean,
  teamId: string,
  accessToken: string,
  botUserId: string,
  botAccessToken: string
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
    default: false,
    type: Boolean
  },
  botAccessToken: {
    required: 'botAccessToken is required',
    trim: true,
    type: String,
    unique: true,
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
  },
})

export default model<IWorkspaceDocument>('Workspace', workspaceSchema)
