import { KnownBlock } from '@slack/client'
import _range from 'lodash/range'
import '../../models/gift.model'
import Gift, { IGift, IGiftDocument } from '../../models/gift.model'
import SlackConsts from '../consts/slack'
import TranslationsService from './translationsService'

export default class GiftService {
  private translationsService: TranslationsService
  private initGifts: IGift[] = [
    {
      amount: 10,
      cost: 50,
      description: "",
      name: "iTunes Gift Card $5",
      teamId: ""
    },
    {
      amount: 10,
      cost: 50,
      description: "",
      name: "Google Play Gift Card $5",
      teamId: ""
    },
    {
      amount: 10,
      cost: 250,
      description: "",
      name: "XBox Life Gift Card $25",
      teamId: ""
    },
    {
      amount: 10,
      cost: 500,
      description: "",
      name: "Amazon Gift Card $50",
      teamId: ""
    },
    {
      amount: 10,
      cost: 1000,
      description: "",
      name: "Lunch with CEO",
      teamId: ""
    }
  ]
  constructor() {
    this.translationsService = new TranslationsService()
  }

  public getGiftById(teamId: string, giftId: string) {
    return Gift.findOne({ teamId, _id: giftId })
  }

  public getAllGiftsBlockInOneArray(gifts: IGiftDocument[]): KnownBlock[] {
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
            text: `*${name}*\n${cost} kudos\n${description}`
          },
          accessory: {
            type: "image",
            image_url: imgUrl,
            alt_text: name
          }
        },
        {
          type: "actions",
          elements: [
            {
              action_id: SlackConsts.buyGiftCallback,
              text: {
                text: this.translationsService.getTranslation('choose'),
                type: "plain_text"
              },
              type: "button",
              value: _id
            }
          ]
        },
        {
          type: "divider"
        }
      ] as KnownBlock[]
    }).reduce((acc, value) => ([...acc, ...value]), [])
  }

  public getGiftPaginationBlock(page: number, totalPages: number) {
    const selectedOption = {
      text: {
        emoji: true,
        text: `Page\xa0${page}`,
        type: "plain_text"
      },
      value: page.toString()
    }
    const options = _range(1, totalPages).map(i => ({
      text: {
        emoji: true,
        text: `Page\xa0${i}`,
        type: "plain_text"
      },
      value: i.toString()
    }))

    return [{
      accessory: {
        action_id: SlackConsts.selectGiftPageCallback,
        initial_option: selectedOption,
        options,
        type: "static_select"
      },
      text: {
        text: "Display gifts page:",
        type: "mrkdwn"
      },
      type: "section"
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
    const giftPaginationBlock = this.getGiftPaginationBlock(
      currentPage,
      totalPages
    )

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
    amount: number,
    description?: string
  ) {
    return await Gift.findOneAndUpdate({
      _id: id,
      teamId
    }, {
        amount,
        cost,
        description: description || null,
        name
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
      imgUrl: imgUrl || null,
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

  public initDefaultGifts(teamId: string) {
    const updateOrInitDefaultGiftsOperations = this.initGifts
      .map(gift => {
        return Gift.findOneAndUpdate(
          {
            $and:
              [
                { name: gift.name },
                { teamId }
              ]
          },
          { ...gift, teamId },
          {
            setDefaultsOnInsert: true,
            upsert: true
          }
        )
      })

    return updateOrInitDefaultGiftsOperations
  }
}
