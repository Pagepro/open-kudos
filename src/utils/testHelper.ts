import merge from 'lodash/merge'

class TestHelper<T> {
    createTestObject(baseTestObject: T, additionalProperties: object): T {
        return merge(baseTestObject, additionalProperties)
    }
}

export default TestHelper