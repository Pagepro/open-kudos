import { expect } from 'chai'
import * as commandService from './commandService'

describe('CommandService parseGive', function () {
  it('parseGive shall for any textCommand return Object', () => {
    const parsedObj = commandService.parseGive({
      text: '',
      user_id: 'someid'
    })
    expect(parsedObj).to.be.a('Object')
  })

  it('testing asuydgfausgef34534453', () => {
    const parsedObj = commandService.parseGive({
      text: 'asuydgfausgef34534453',
      user_id: 'someid'
    })
    expect(parsedObj).to.have.property('value').eql(NaN)
  })

  it('testing give <@USERID> asuydgfausgef34534453', () => {
    const parsedObj = commandService.parseGive({
      text: 'give <@USERID> asuydgfausgef34534453',
      user_id: 'someid'
    })
    expect(parsedObj).to.have.property('value').eql(NaN)
    expect(parsedObj).to.have.property('receiverId', 'USERID')
  })

  it('testing give <@USERID> 100 asuydgfausgef34534453', () => {
    const parsedObj = commandService.parseGive({
      text: '<@USERID> 100 asuydgfausgef34534453',
      user_id: 'someid'
    })
    expect(parsedObj).to.have.property('value', 100)
    expect(parsedObj).to.have.property('receiverId', 'USERID')
  })
})
