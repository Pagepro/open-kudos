import { Request } from "express"
import { IFile } from "../../controllers/giftsController/models";

interface IRequestUser {
  user: {
    team_id: string
    user: string
    user_id: string
    is_admin: boolean
    is_owner: boolean
    is_primary_owner: boolean
  }
}

interface IRequestFile {
  file?: IFile
}

export type IUserEnhancedRequest = IRequestUser & IRequestFile & Request
