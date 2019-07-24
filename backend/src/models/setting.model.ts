import { Document, model, Schema } from 'mongoose'

export interface ISetting {
  key: string,
  value?: string
}

export type ISettingDocument = ISetting & Document

const settingSchema: Schema<ISetting> = new Schema({
  key: {
    required: 'key is required',
    trim: true,
    type: String,
  },
  value: {
    trim: true,
    type: String,
  }
})

export default model<ISettingDocument>('Setting', settingSchema)
