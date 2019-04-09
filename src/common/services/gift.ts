import { AttachmentAction, MessageAttachment } from '@slack/client'
import '../../models/gift.model'
import Gift from '../../models/gift.model'
import { gifts } from '../../test/testData'
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
    const giftsWithTeamId = gifts.map(gift => ({ ...gift, teamId }))
    await Gift.deleteMany({})
    await Gift.insertMany(giftsWithTeamId)
  }

  public async getAllGiftsAsAttachment(teamId: string) {
    await this.initGifts(teamId)
    const allGifts = await Gift.find({ teamId })
    const giftAsAttachment = allGifts.map(gift => {
      return {
        actions: [
          {
            name: gift.name,
            text: this.translationsService.getTranslation(
              "getForKudos",
              gift.cost
            ),
            type: 'button'
          }
        ] as AttachmentAction[],
        color: this.getRandomHexColor(),
        text: gift.description,
        title: gift.name,
      }
    })

    return giftAsAttachment as MessageAttachment[]
  }

  private getRandomHexColor() {
    // tslint:disable-next-line:no-bitwise
    return `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
  }

}
