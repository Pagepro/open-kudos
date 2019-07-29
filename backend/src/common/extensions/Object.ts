export {}

declare global {
  // tslint:disable-next-line: interface-name
  interface ObjectConstructor {
    empty: {}
    tryGetProperty: <T, V>(
      obj: T,
      propertyAccessor: (obj: T) => V, defaultValue?: V
    ) => V
  }
}

const emptyObject = {}

// tslint:disable-next-line: only-arrow-functions
const tryGetProperty = function<T, V>(
  obj: T,
  propertyAccessor: (obj: T) => V | undefined,
  defaultValue?: V
) {
  try {
    const accessorResult = propertyAccessor(obj)

    if (accessorResult === undefined) {
      return defaultValue
    }

    return accessorResult
  } catch (_) {
    return defaultValue
  }
}

Object.defineProperties(Object, {
  empty: {
    get: () => emptyObject
  },
  tryGetProperty: {
    get: () => tryGetProperty
  }
})
