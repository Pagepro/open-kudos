import { from } from 'rxjs'
import web from './auth'
export const getUsersList = from(web.users.list())


