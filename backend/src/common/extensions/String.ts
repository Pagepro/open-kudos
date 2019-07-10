import _ from 'lodash'
export { }
declare global {
  // tslint:disable-next-line
  interface StringConstructor {
    empty: string
  }

  // tslint:disable-next-line
  interface String {
    format(...formatValues: Array<number | string>): string
    toPascalCase(): string
  }
}
const EMPTY_STRING = ''

const format =
  function (this: string, ...formatValues: Array<number | string>) {
    return this.replace(/{(\d+)}/g, (match, index) =>
      typeof formatValues[index] !== 'undefined'
        ? formatValues[index].toString()
        : match
    )
  }

const toPascalCase = function (this: string) {
  return _.chain(this).camelCase().upperFirst().value()
}

Object.defineProperties(String, {
  empty: {
    get: () => EMPTY_STRING
  }
})

Object.defineProperties(String.prototype, {
  format: {
    get: () => format
  },
  toPascalCase: {
    get: () => toPascalCase
  }
})
