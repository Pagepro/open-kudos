import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import AuthToken from './request/authToken'
import Unauthorized from './response/unauthorized'

const requestInterceptors = [
  new AuthToken()
]

const responseInterceptors = [
  new Unauthorized()
]

type ResolveCallbackType = (config: AxiosRequestConfig) => AxiosRequestConfig
type ResponseCallbackType = (response: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>

const registerInterceptors = (axiosInstance: AxiosInstance = axios) => {
  requestInterceptors.forEach(instance => {
    const {
      resolve
    } = instance
    const boundResolve = resolve.bind(instance) as unknown as ResolveCallbackType

    axiosInstance.interceptors.request.use(boundResolve)
  })

  responseInterceptors.forEach((instance) => {
    const {
      resolve,
      reject
    } = instance
    const boundResolve = resolve.bind(instance) as unknown as ResponseCallbackType
    const boundReject = reject.bind(instance) as unknown as ResponseCallbackType

    axiosInstance.interceptors.response.use(boundResolve, boundReject)
  })
}

export {
  registerInterceptors as default
}
