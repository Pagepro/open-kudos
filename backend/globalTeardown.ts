import DbService from './src/common/services/db'
import Gift from './src/models/gift.model'
import User from './src/models/user.model'

const globalTeardown = async () => {
  const db = new DbService()
  db.connect()
  await User.deleteMany({})
  await Gift.deleteMany({})
  db.disconnect()
  // @ts-ignore
  global.__MONGOD__.stop()
}

export default globalTeardown
