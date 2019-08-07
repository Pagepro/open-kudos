import { KnownBlock } from '@slack/client'
import '../../models/gift.model'
import Gift, { IGiftDocument } from '../../models/gift.model'
import SlackConsts from '../consts/slack'
import TranslationsService from './translationsService'

export default class GiftService {
  private translationsService: TranslationsService

  constructor() {
    this.translationsService = new TranslationsService()
  }

  public getGiftById(teamId: string, giftId: string) {
    return Gift.findOne({ teamId, _id: giftId })
  }

  public getAllGiftsBlockInOneArray(gifts: IGiftDocument[]) {
    return gifts.map(({
      name,
      description,
      _id,
      cost,
      imgUrl
    }) => {
      return [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${name}*`
          }
        },
        {
          type: "section",
          text: {
            type: "plain_text",
            text: description || " "
          }
        },
        {
          type: "image",
          image_url: imgUrl,
          alt_text: name
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: this.translationsService.getTranslation(
                  'getForKudos',
                  cost
                )
              },
              value: _id,
              action_id: SlackConsts.buyGiftCallback
            }
          ]
        },
        {
          type: "divider"
        }
      ] as KnownBlock[]
    }).reduce((acc, value) => {
      return acc.concat(...value)
    }, [])
  }

  public getGiftPaginationBlock(page: number, totalPages: number) {
    const options = []
    const selectedOption = {
      text: {
        type: "plain_text",
        text: `Page ${page}`,
        emoji: true
      },
      value: `${page}`
    }

    for (let i = 1; i <= totalPages; i++) {
      options.push({
        text: {
          type: "plain_text",
          text: `Page ${i}`,
          emoji: true
        },
        value: `${i}`
      })

    }
    return [{
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Display gifts page:"
      },
      accessory: {
        type: "static_select",
        action_id: SlackConsts.selectGiftPageCallback,
        initial_option: selectedOption,
        options
      }
    }] as KnownBlock[]
  }

  public async getAllPaginatedGiftBlocks(
    teamId: string,
    limit?: number,
    page?: number
  ) {
    const aggregate = Gift.aggregate()

    aggregate.match({
      isAvailable: true,
      teamId
    })

    const gifts = await Gift.aggregatePaginate(aggregate, {
      limit,
      page,
      sort: {
        cost: 1
      }
    })

    const { page: currentPage, totalPages } = gifts
    const giftBlocks = this.getAllGiftsBlockInOneArray(gifts.docs)
    const giftPaginationBlock = this.getGiftPaginationBlock(currentPage, totalPages)

    return [...giftBlocks, ...giftPaginationBlock]
  }

  public async getAllPaginated(
    teamId: string,
    limit?: number,
    page?: number
  ) {
    const aggregate = Gift.aggregate()

    aggregate.match({
      isAvailable: true,
      teamId
    })

    return await Gift.aggregatePaginate(aggregate, {
      limit,
      page,
      sort: {
        cost: 1
      }
    })
  }

  public async patchGift(
    id: string,
    teamId: string,
    name: string,
    cost: number,
    description?: string
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

  public async addGift(
    teamId: string,
    name: string,
    cost: number,
    description?: string,
    imgUrl?: string
  ) {
    return await new Gift({
      cost,
      description: description || null,
      isAvailable: true,
      name,
      teamId,
      imgUrl: imgUrl || null
    }).save()
  }

  public async deleteGift(id: string, teamId: string) {
    return await Gift.findOneAndDelete({
      _id: id,
      teamId
    })
  }
}
