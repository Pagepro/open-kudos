export { }

declare global {
  // tslint:disable-next-line: interface-name
  interface StringConstructor {
    empty: string
  }

  // tslint:disable-next-line: interface-name
  interface String {
    format(...formatValues: Array<(number | string)>): string
    firstCharToLowerCase(): string
  }
}

const EMPTY_STRING = ''

const format =
  function (this: string, ...formatValues: Array<(number | string)>) {
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

// eslint-disable-next-line
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

// eslint-disable-next-line
Object.defineProperties(String.prototype, {
  firstCharToLowerCase: {
    get: () => firstCharToLowerCase
  }
})
