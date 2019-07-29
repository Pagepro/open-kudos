import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import AuthToken from './request/authToken';

const requestInterceptors = [
  new AuthToken()
]

type ResolveCallbackType = (config: AxiosRequestConfig) => AxiosRequestConfig

const registerInterceptors = (axiosInstance: AxiosInstance = axios) => {
  requestInterceptors.forEach(instance => {
    const {
      resolve
    } = instance
    const boundResolve = resolve.bind(instance) as unknown as ResolveCallbackType

    axiosInstance.interceptors.request.use(boundResolve)
  })
}

export {
  registerInterceptors as default
}
