import { expect } from 'chai'
import * as commandService from './commandService'
describe('CommandService parseGive', function () {
  it('parseGive shall for any textCommand return Object', () => {
    const parsedObj = commandService.parseGive('')
    expect(parsedObj).to.be.a('Object')
  })

  it('testint asuydgfausgef34534453', () => {
    const parsedObj = commandService.parseGive('asuydgfausgef34534453')
    expect(parsedObj).eql({
      kudosReceiverId: '',
      kudosTransactionValue: NaN
    })
  })

  it('testint give <@USERID> asuydgfausgef34534453', () => {
    const parsedObj = commandService.parseGive('give <@USERID> asuydgfausgef34534453')
    expect(parsedObj).eql({
      kudosReceiverId: 'USERID',
      kudosTransactionValue: NaN
    })
  })

  it('testint give <@USERID> 100 asuydgfausgef34534453', () => {
    const parsedObj = commandService.parseGive('give <@USERID> 100 asuydgfausgef34534453')
    expect(parsedObj).eql({
      kudosReceiverId: 'USERID',
      kudosTransactionValue: 100
    })
  })
})
