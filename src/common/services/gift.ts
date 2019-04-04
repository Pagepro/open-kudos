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

  public async initGifts() {
    await Gift.deleteMany({})
    await Gift.insertMany(gifts)
  }

  public async getAllGifts() {
    await this.initGifts()
    return Gift.find({})
  }

  public async getAllGiftsAsAttachment() {
    await this.initGifts()
    const allGifts = await Gift.find({})
    const giftAsAttachment = allGifts.map(gift => {
      return {
        actions: [
          {
            id: gift.id,
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
