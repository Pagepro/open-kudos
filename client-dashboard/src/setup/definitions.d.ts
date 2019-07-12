export { }

declare global {
  interface IMappedObject<T> {
    [key: string]: T
  }
}
