export { }

declare global {
  interface IStringTMap<T> { [key: string]: T }
  // type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
}
