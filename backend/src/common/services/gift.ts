import { AttachmentAction, MessageAttachment } from '@slack/client'
import '../../models/gift.model'
import Gift from '../../models/gift.model'
import { realGifts } from '../../test/testData'
import SlackConsts from '../consts/slack'
import Helpers from './helpers'
import TranslationsService from './translationsService'

export default class GiftService {
  private translationsService: TranslationsService

  constructor() {
    this.translationsService = new TranslationsService()
  }

  public async initGifts(teamId: string) {
    // TODO: for now we display static list of gifts in future gifts will be
    // added from dashboard with valid teamId so initGifts method
    // will be removed
    const giftsWithTeamId = realGifts.map(gift => ({ ...gift, teamId }))

    await Gift.deleteMany({})
    await Gift.insertMany(giftsWithTeamId)
  }

  public getGiftById(teamId: string, giftId: string) {
    return Gift.findOne({ teamId, _id: giftId })
  }

  public async getAllGiftsAsAttachment(teamId: string) {
    await this.initGifts(teamId)

    const allGifts = await Gift.find({ teamId })
    const giftAsAttachment = allGifts.map(({
      name,
      description,
      id,
      cost
    }) => {
      return {
        actions: [
          {
            name,
            text: this.translationsService.getTranslation(
              'getForKudos',
              cost
            ),
            type: 'button',
            value: id
          }
        ] as AttachmentAction[],
        callback_id: SlackConsts.buyGiftCallback,
        color: Helpers.getRandomHexColor(),
        text: description,
        title: name
      }
    })

    return giftAsAttachment as MessageAttachment[]
  }

  public async getAllPaginated(
    teamId: string,
    limit?: number,
    offset?: number
  ) {
    return await Gift.paginate(
      {
        isAvailable: true,
        teamId
      },
      {
        limit,
        offset,
        sort: {
          cost: 1
        }
      }
    )
  }
}
