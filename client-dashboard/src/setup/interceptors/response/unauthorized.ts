import { ResponseInterceptor } from '../interceptor'
import { AxiosError } from 'axios'

export default class Unauthorized extends ResponseInterceptor {
  public static INTERCEPTOR_KEY = 'unauthorized'

  public async reject(error: AxiosError) {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
}
