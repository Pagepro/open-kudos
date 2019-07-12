interface IInterceptor {
  constructor: {
    INTERCEPTOR_KEY: String
    name: string
  }
}

interface IInterceptorConfig {
  interceptors: IMappedObject<{
    skip?: boolean
  }>
}


class BaseInterceptor {
  getInterceptorConfig(interceptorInstance: IInterceptor, config: IInterceptorConfig) {
    const interceptorKey: String = interceptorInstance.constructor.INTERCEPTOR_KEY

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

  shouldSkipInterceptor(interceptorInstance: any, config: any) {
    const {
      skip = false
    } = this.getInterceptorConfig(interceptorInstance, config)

    return skip
  }
}

export class RequestInterceptor extends BaseInterceptor {
  resolve(config: any) {
    return Promise.resolve(config)
  }
}
