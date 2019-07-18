export { }
import { IGlobalState } from './reducers'

declare global {
  interface IMappedObject<T> {
    [key: string]: T
  }
}
