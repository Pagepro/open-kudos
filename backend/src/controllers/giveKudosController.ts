import {
    Controller,
    Post,
    Request as RequestDecorator,
    Response as ResponseDecorator
} from '@decorators/express'
import { Response } from 'express'
import { IUserEnhancedRequest } from '../middleware/definitions/authMiddleware'
import AuthMiddleware from '../middleware/authMiddleware'
import TranslationsService from "../common/services/translationsService"
import UserService from "../common/services/user"
import TransferService from "../common/services/transfer"
import { ITransfer } from '../models/transfer.model'
import SlackClientService from "../common/services/slackClient"
import { SlackResponseType } from "../common/factories/definitions/slackCommandHandlerFactory"

@Controller('/giveKudos')
export default class SettingsController {
    protected translationsService = new TranslationsService()
    protected userService = new UserService()
    protected transferService = new TransferService()
    protected slackClientService = new SlackClientService()

    @Post('/', [AuthMiddleware])
    public async giveKudos(
        @RequestDecorator() req: IUserEnhancedRequest,
        @ResponseDecorator() res: Response
    ) {
        const { team_id, user_id } = req.user
        const { kudosReceiver, kudosAmount, kudosReason } = req.body
        try {


            let sender = await this.userService.getUser(team_id, user_id)
            let receiver = await this.userService.getUser(team_id, kudosReceiver)

            if (!receiver) {
                throw new Error(
                    this.translationsService.getTranslation(
                        "couldntFindThePersonYouWantedToGivePointsTo"
                    )
                )
            }
            if (kudosReceiver === user_id) {
                throw new Error(
                    this.translationsService.getTranslation("youCantGivePointsToYourself")
                )
            }
            const validPoints = Number(kudosAmount)
            if (!(Number.isInteger(validPoints) && validPoints > 0 && validPoints)) {
                throw new Error(
                    this.translationsService.getTranslation(
                        "youTriedToGiveXPointsButThisIsNotValid",
                        kudosAmount
                    )
                )
            }
            if (sender.kudosGiveable < kudosAmount) {
                throw new Error(
                    this.translationsService
                        .getTranslation("youDontHaveEnoughKudosToTransfer")
                )
            }

            const transferKudosPayload: ITransfer = {
                senderId: user_id,
                receiverId: kudosReceiver,
                teamId: team_id,
                value: kudosAmount,
                comment: kudosReason
            }

            await this.transferService.transferKudos(transferKudosPayload)

            this.slackClientService.sendMessage(this.translationsService
                .getTranslation("xGaveYZPoints",
                    transferKudosPayload.senderId,
                    transferKudosPayload.receiverId,
                    transferKudosPayload.value,
                    transferKudosPayload.comment), {
                channel: transferKudosPayload.senderId,
                teamId: transferKudosPayload.teamId,
                user: transferKudosPayload.senderId
            }, SlackResponseType.General)

            res.status(200).send()
        } catch ({ message }) {
            res.status(500).send(message)
        }
    }
}
