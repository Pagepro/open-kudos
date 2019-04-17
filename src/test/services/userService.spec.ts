/* tslint:disable */
import { expect } from 'chai'
import UserService from '../../common/services/user'
import { newUserData } from '../testData'
import User from '../../models/user.model'

describe('UserService tests', () => {
  it(`method checkIfUserExist should return false if user not exist`, async () => {
    const userService = new UserService()
    const userExist = await userService.checkIfUserExist(
      newUserData.teamId, newUserData.userId)

    expect(userExist).to.be.equal(false)
  })

  it(`method createUser should return new user Id`, async () => {
    const userService = new UserService()
    const newUser = await userService.createUser(newUserData)

    expect(newUser.id).to.be.a('string').that.is.not.empty
  })

  it(`New user should has 100 givable kudos`, async () => {
    const userService = new UserService()
    const newUser = await userService.getUser(newUserData.teamId, newUserData.userId)

    expect(newUser.kudosGiveable).to.be.eq(100)
  })
})
