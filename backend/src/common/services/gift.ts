import { AttachmentAction, MessageAttachment } from '@slack/client'
import '../../models/gift.model'
import Gift from '../../models/gift.model'
import { realGifts } from '../../test/testData'
import SlackConsts from '../consts/slack'
import Helpers from './helpers'
import TranslationsService from './translationsService'
import LoggerService from './logger'
import { PaginateOptions } from 'mongoose'

export default class GiftService {
  private translationsService: TranslationsService
  private logger: LoggerService

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
    const giftAsAttachment = allGifts.map(gift => {
      return {
        actions: [
          {
            name: gift.name,
            text: this.translationsService.getTranslation(
              "getForKudos",
              gift.cost
            ),
            type: 'button',
            value: gift.id
          }
        ] as AttachmentAction[],
        callback_id: SlackConsts.buyGiftCallback,
        color: Helpers.getRandomHexColor(),
        text: gift.description,
        title: gift.name,
      }
    })

    return giftAsAttachment as MessageAttachment[]
  }

  public async getAllPaginated(query?: Object, options?: PaginateOptions) {
    try {
      const gifts = await Gift.paginate(query, options)
      return gifts
    } catch (error) {
      this.logger.logError(error)
      throw new Error('Internal server error')
    }
  }
}
