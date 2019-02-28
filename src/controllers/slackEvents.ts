import { Request, Response, NextFunction } from 'express'
import GiveCommandHandler from './giveCommandHandler'
import { transferKudos } from '../services/kudos'
import { getWebClient } from '../services/webApi/client'

interface ISlackEventInfo {
    challenge?: object
    token: string
    team_id: string
    api_app_id: string
    event?:
    {
        subtype?: string
        bot_id?: string
        client_msg_id: string
        type: string
        text: string
        user: string
        ts: string
        channel: string
        event_ts: string
        channel_type: string
    },
    type: string
    event_id: string
    event_time: number,
    authed_users: string[]
}

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

function handleCommand(command: string, slackEventInfo: ISlackEventInfo) {
    switch (command) {
        case 'give':
            handleGiveCommand(slackEventInfo)
            break;
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

async function handleGiveCommand(slackEventInfo: ISlackEventInfo) {
    const { text } = slackEventInfo.event
    const [
        _firstWord,
        _command,
        receiverUserId = '',
        points = ''
    ] = text.split(' ')
    const giverUserId = slackEventInfo.event.user
    const giveCommandHandler = new GiveCommandHandler(
        giverUserId,
        points,
        receiverUserId,
        text)

    await giveCommandHandler.validate()

    if (giveCommandHandler.isValid) {
        try {
            await transferKudos(slackEventInfo.team_id, giveCommandHandler.transfer)
            sendResponseMessageToSlack(giveCommandHandler.getInformationWhyUserGetsPoints(), slackEventInfo)
        } catch (ex) {
            sendResponseMessageToSlack(ex.message, slackEventInfo)
        }
    } else {
        sendResponseMessageToSlack(giveCommandHandler.errorMessage, slackEventInfo)
    }
}

function sendResponseMessageToSlack(text: string, slackEventInfo: ISlackEventInfo) {
    const { channel } = slackEventInfo.event

    getWebClient(slackEventInfo.team_id).chat.postMessage({ channel, text })
}

export { events }