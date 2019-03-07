import database, { CustomDb } from './mongodb'
import { expect } from 'chai'

describe('Mongo test unit', function () {

    before(async () => {
        const db: CustomDb = await database()
        await db.collection('testing').insertOne({
            id: 'someId',
            value: 'someValue'
        })
    })

    it('shall has testing collections with one element', async () => {
        const db: CustomDb = await database()
        const count = await db.collection('testing').countDocuments({})
        expect(count).eql(1)
    })

    after(async () => {
        const db: CustomDb = await database()
        await db.dropCollection('testing')
    })

})
