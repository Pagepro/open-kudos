import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

type IExtendedInterceptorInstance = BaseInterceptor & {
  constructor: {
    INTERCEPTOR_KEY: String
  }
}

export interface IInterceptorConfig extends AxiosRequestConfig {
  interceptors: IMappedObject<{
    skip?: boolean
  }>
}


abstract class BaseInterceptor {
  public getInterceptorConfig(interceptorInstance: BaseInterceptor, config: IInterceptorConfig) {
    const extendedInterceptorInstance = interceptorInstance as IExtendedInterceptorInstance
    const interceptorKey: String = extendedInterceptorInstance.constructor.INTERCEPTOR_KEY

    if (!interceptorKey) {
      console.error(`You have to define 'INTERCEPTOR_KEY' static field in your ${interceptorInstance.constructor.name} interceptor class to use it's config.`)

      return {}
    }

    const {
      interceptors: {
        [interceptorKey.firstCharToLowerCase()]: interceptorConfig = {}
      } = {}
    } = config

    return interceptorConfig
  }

  public shouldSkipInterceptor(interceptorInstance: BaseInterceptor, config: IInterceptorConfig) {
    const {
      skip = false
    } = this.getInterceptorConfig(interceptorInstance, config)

    return skip
  }
}

export class RequestInterceptor extends BaseInterceptor {
  public resolve(config: IInterceptorConfig) {
    return Promise.resolve(config)
  }
}

export class ResponseInterceptor {
  public resolve(response: AxiosResponse<any>) {
    return Promise.resolve(response)
  }

  public reject(error: AxiosError<any>) {
    return Promise.reject(error)
  }
}
