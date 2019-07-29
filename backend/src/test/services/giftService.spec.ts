import GiftService from '../../common/services/gift'
import { testGifts, testTeamId } from '../testData'

describe('GiftService tests', () => {
  it(`method getAllPaginated should return paginated gifts (limit 1)`, () => {
    const giftService = new GiftService()
    giftService.getAllPaginated(testTeamId, 1).then(data => {
      expect(data.docs.length).toEqual(1)
      expect(data.totalDocs).toEqual(
        testGifts.filter(testGift => testGift.isAvailable !== false).length
      )
    })
  })
})
