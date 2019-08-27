import { ResponseInterceptor } from '../interceptor'
import { AxiosError } from 'axios'
import { clearAuthToken } from '../utils'

export default class Unauthorized extends ResponseInterceptor {
  public static INTERCEPTOR_KEY = 'unauthorized'

  public async reject(error: AxiosError) {
    if (error.response && error.response.status === 401) {
      clearAuthToken()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
}
