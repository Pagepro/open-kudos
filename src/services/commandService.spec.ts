import { expect } from 'chai'
import * as commandService from './commandService'
describe('CommandService', function () {
  it('func parse shall any textCommand return Object', () => {
    const parsedObj = commandService.parse('')
    expect(parsedObj).to.be.a('Object')
  })
})
