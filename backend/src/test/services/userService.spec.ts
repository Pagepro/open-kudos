import UserService from '../../common/services/user'
import { newUserData } from '../testData'

describe('UserService tests', () => {
  it(`method checkIfUserExist should return false if user not exist`, () => {
    const userService = new UserService()
    userService.checkIfUserExist(
      newUserData.teamId,
      newUserData.userId
    ).then(data => {
      expect(data).toBe(false)
    })
  }
  )

  it(`method createUser should return new user Id`, () => {
    const userService = new UserService()
    userService.createUser(newUserData).then(newUser => {
      expect(newUser.id).not.toBeNull()
    })
  })

  it(`New user should has 100 givable kudos`, async () => {
    const userService = new UserService()
    userService.getUser(
      newUserData.teamId,
      newUserData.userId
    ).then(user => {
      expect(user.kudosGiveable).toEqual(100)
    })
  })
})
