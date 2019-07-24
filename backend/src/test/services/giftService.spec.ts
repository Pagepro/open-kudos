import { expect } from 'chai'
import GiftService from '../../common/services/gift'
import { testGifts, testTeamId } from '../testData'

describe('GiftService tests', () => {
  it(`method getAllPaginated should return paginated gifts (limit 1)`,
    async () => {
      const giftService = new GiftService()
      const paginatedGifts = await giftService.getAllPaginated(testTeamId, 1)

      expect(paginatedGifts.docs.length).to.be.equal(1)
      expect(paginatedGifts.total).to.be.equal(
        testGifts.filter(
          testGift => testGift.isAvailable !== false
        ).length
      )
    }
  )
})
