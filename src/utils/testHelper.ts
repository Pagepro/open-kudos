import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
}

class TestHelper<T> {
    createTestObject(baseTestObject: T, additionalProperties: RecursivePartial<T>): T {
        return merge(cloneDeep(baseTestObject), additionalProperties)
    }
}

export default TestHelper