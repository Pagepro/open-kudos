import { AxiosRequestConfig } from "axios";

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
  getInterceptorConfig(interceptorInstance: BaseInterceptor, config: IInterceptorConfig) {
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

  shouldSkipInterceptor(interceptorInstance: BaseInterceptor, config: IInterceptorConfig) {
    const {
      skip = false
    } = this.getInterceptorConfig(interceptorInstance, config)

    return skip
  }
}

export class RequestInterceptor extends BaseInterceptor {
  resolve(config: IInterceptorConfig) {
    return Promise.resolve(config)
  }
}
