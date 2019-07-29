import { Request } from "express"

interface IRequestUser {
  user: {
    team_id: string
    user: string
    user_id: string
  }
}

export type IUserEnhancedRequest = IRequestUser & Request
