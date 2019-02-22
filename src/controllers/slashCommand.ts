import { Request, Response, NextFunction } from 'express'
import { parseGive, validateGive } from './../services/commandService'
import { Db } from 'mongodb'

interface CustomRequest extends Request {
    command?: any
}

function executeCommand(req: CustomRequest, res: Response, next: NextFunction) {
    res.json({
        'response_type': 'in_channel'
        , 'text': JSON.stringify(req.command)
    })
}

function events(req: Request, res: Response, next: NextFunction) {
    if (req.body.challenge) {
        res.send(req.body)
    } else {
        // TODO: logic to put event on queue
    }
}

function searchCommand(req: CustomRequest, res: Response, next: NextFunction) {

    const kudosCommandArr = /\w+/.exec(req.body.text)
    const kudosCommand = kudosCommandArr ? kudosCommandArr[0] : ''

    switch (kudosCommand.toLowerCase()) {
        case 'give':
            if (validateGive(req.body.text)) {
                req.command = parseGive(req.body.text)
                next()
            }
            break
        case 'help':
            res.end('There is no help')
            break
        default:
            res.end("Simpler pls, what do you mean? Perhaps '/kudos help' will help")
    }
}

async function test(req: Request, res: Response, next: NextFunction) {
    try {
        const db: Db = req.app.locals.db;
        const test = await db.collection('test').insert({test: 'test'})

        if (test) {
            res.json(test)
        } else {
            res.send('error')
        }
    } catch (err) {
        next(err)
    }
}

export {
    executeCommand
    , searchCommand
    , events
    , test
 }