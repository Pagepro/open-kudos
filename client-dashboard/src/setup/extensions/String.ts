export { }

declare global {
  // tslint:disable-next-line
  interface StringConstructor {
    empty: string
  }

  interface String {
    format(...formatValues: (number | string)[]): string
  }
}

const EMPTY_STRING = ''

const format =
  function (this: string, ...formatValues: (number | string)[]) {
    return this.replace(/{(\d+)}/g, (match, index) =>
      typeof formatValues[index] !== 'undefined'
        ? formatValues[index].toString()
        : match
    )
  }

const firstCharToLowerCase = function (this: string) {
  const [firstLetter, ...rest] = this.split('')
  return [firstLetter.toLowerCase(), rest].join('')
}

Object.defineProperties(String, {
  empty: {
    get: () => EMPTY_STRING
  }
})

// eslint-disable-next-line
Object.defineProperties(String.prototype, {
  format: {
    get: () => format
  }
})

Object.defineProperties(String.prototype, {
  firstCharToLowerCase: {
    get: () => firstCharToLowerCase
  }
})
