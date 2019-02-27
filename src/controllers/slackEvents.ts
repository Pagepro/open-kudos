import { Request, Response, NextFunction } from 'express'
import { WebClient } from '@slack/client'
import GiveCommandHandler from './GiveCommandHandler';

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
        console.log(slackEventInfo)
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
    const informationWhyUserGetsPoints = getInformationWhyUserGetsPoints(text, giverUserId)

    const giveCommandHandler = new GiveCommandHandler(
        giverUserId,
        points,
        receiverUserId,
        informationWhyUserGetsPoints)

    await giveCommandHandler.validate()

    if (giveCommandHandler.isValid) {
        // TODO: call class method to give points for user
        sendResponseMessageToSlack(giveCommandHandler.messageWhyPointsWasGiven, slackEventInfo)
    } else {
        sendResponseMessageToSlack(giveCommandHandler.errorMessage, slackEventInfo)
    }
}

function getInformationWhyUserGetsPoints(text: string, giverUserId: string) {
    const wordsInCommand = text.split(' ')
    return wordsInCommand.length > 4 ?
        wordsInCommand.slice(3, wordsInCommand.length).join(' ') :
        `<@${giverUserId}> didn't give reason for giving points.`;
}

function sendResponseMessageToSlack(text: string, slackEventInfo: ISlackEventInfo) {
    const token = process.env.BOT_USER_O_AUTH_ACCESS_TOKEN
    const web = new WebClient(token)
    const { channel } = slackEventInfo.event

    web.chat.postMessage({ channel, text })
}

export { events }