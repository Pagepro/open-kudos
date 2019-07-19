import { AttachmentAction, MessageAttachment } from '@slack/client'
import '../../models/gift.model'
import Gift from '../../models/gift.model'
import SlackConsts from '../consts/slack'
import Helpers from './helpers'
import TranslationsService from './translationsService'

export default class GiftService {
  private translationsService: TranslationsService

  constructor() {
    this.translationsService = new TranslationsService()
  }

  public getGiftById(teamId: string, giftId: string) {
    return Gift.findOne({ teamId, _id: giftId })
  }

  public async getAllGiftsAsAttachment(teamId: string) {
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

  public async patchGift (
    id: string,
    teamId: string,
    name: string,
    cost: number,
    description? : string
  ) {
    return await Gift.findOneAndUpdate({
      _id: id,
      teamId
    }, {
      cost,
      description: description || null,
      name,
    }, {
      new: true
    })
  }

  public async addGift (
    teamId: string,
    name: string,
    cost: number,
    description? : string
  ) {
    return await new Gift({
      cost,
      description: description || null,
      isAvailable: true,
      name,
      teamId
    }).save()
  }

  public async deleteGift(id: string, teamId: string) {
    return await Gift.findOneAndDelete({
      _id: id,
      teamId
    })
  }
}
