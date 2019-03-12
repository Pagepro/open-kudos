import { Request, Response, NextFunction } from 'express'
import GiveCommandHandler from '../eventCommandHandlers/give/giveCommandHandler'
import { ISlackEventInfo } from '../eventCommandHandlers/interfaces'
import { sendResponseMessageToSlack } from '../eventCommandHandlers/eventResponse'
import getText from '../services/translations'
import dictionary from '../services/translations/dictionary'
import BalanceCommandHandler from '../eventCommandHandlers/balance/balanceCommandHandler'

function events(req: Request, res: Response, next: NextFunction) {
    const slackEventInfo: ISlackEventInfo = req.body
    const subtype = slackEventInfo.event ? slackEventInfo.event.subtype : null
    if (slackEventInfo.challenge) {
        res.send(req.body)
    } else if (subtype && subtype === 'bot_message') {
        res.sendStatus(200)
    } else {
        res.sendStatus(200)
        handleEvent(slackEventInfo)
    }
}

function handleEvent(slackEventInfo: ISlackEventInfo) {
    const command = getSlackCommand(slackEventInfo)
    handleCommand(command, slackEventInfo)
}

function getSlackCommand(slackEventInfo: ISlackEventInfo) {
    const [_firstWord, command = '', ...restOfMessage] = slackEventInfo.event.text.split(' ')
    return command.toLowerCase()
}

async function handleCommand(command: string, slackEventInfo: ISlackEventInfo) {
    switch (command) {
        case 'give': {
            const giveCommandHandler = new GiveCommandHandler(slackEventInfo)
            giveCommandHandler.handleCommand()
            break;
        }
        case 'balance': {
            const balanceCommandHandler = new BalanceCommandHandler(slackEventInfo)
            balanceCommandHandler.handleCommand()
            break;
        }
        case 'help':
            sendResponseMessageToSlack(getText(dictionary.HELP_RESPONSE), slackEventInfo)
            break;
        default:
            sendResponseMessageToSlack(
                getText(dictionary.COMMAND_NOT_RECOGNIZED),
                slackEventInfo
            )
            break;
    }
}

export { events }