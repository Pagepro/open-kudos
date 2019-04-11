import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
}

class TestHelper<T> {
  public createTestObject(
    baseTestObject: T,
    additionalProperties: RecursivePartial<T>): T {
    return merge(cloneDeep(baseTestObject), additionalProperties)
  }
}

export default TestHelper
