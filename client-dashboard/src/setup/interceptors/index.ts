import axios, { AxiosInstance } from 'axios'
import AuthToken from './request/authToken';

const requestInterceptors = [
  new AuthToken()
]

const registerInterceptors = (axiosInstance: AxiosInstance = axios) => {
  requestInterceptors.forEach(instance => {
    const {
      resolve
    } = instance

    axiosInstance.interceptors.request.use(resolve.bind(instance))
  })
}

export {
  registerInterceptors as default
}
