export interface INewGift {
  cost: number,
  description?: string,
  name: string
}

export interface IFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer,
  size: number
}
