import { Request, Response, NextFunction } from 'express'
import GiveCommandHandler from '../eventCommandHandlers/giveCommandHandler'
import { ISlackEventInfo } from '../eventCommandHandlers/interfaces'
import { sendResponseMessageToSlack } from '../eventCommandHandlers/eventResponse';

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
        case 'help':
            sendResponseMessageToSlack(`Here you will see all commands that ou can use :)`, slackEventInfo)
            break;
        default:
            sendResponseMessageToSlack(
                `I don't know that command please use help if you want to know all commands`,
                slackEventInfo
            )
            break;
    }
}

export { events }