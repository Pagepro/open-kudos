import { Request, Response, NextFunction } from 'express'

function command(req: Request, res: Response, next: NextFunction) {
    const sampleResponse = {
        'text': 'Would you like to play a game?',
        'attachments': [
            {
                'text': 'Choose a game to play',
                'fallback': 'You are unable to choose a game',
                'callback_id': 'wopr_game',
                'color': '#3AA3E3',
                'attachment_type': 'default',
                'actions': [
                    {
                        'name': 'game',
                        'text': 'Chess',
                        'type': 'button',
                        'value': 'chess'
                    },
                    {
                        'name': 'game',
                        'text': `Falken's Maze`,
                        'type': 'button',
                        'value': 'maze'
                    },
                    {
                        'name': 'game',
                        'text': 'Thermonuclear War',
                        'style': 'danger',
                        'type': 'button',
                        'value': 'war',
                        'confirm': {
                            'title': 'Are you sure?',
                            'text': `Wouldn't you prefer a good game of chess?`,
                            'ok_text': 'Yes',
                            'dismiss_text': 'No'
                        }
                    }
                ]
            }
        ]
    }

    res.json(sampleResponse)
}

function events(req: Request, res: Response, next: NextFunction) {
    if (req.body.challenge) {
        res.send(req.body)
    } else {
        // TODO: logic to put event on queue
    }
}

export { command, events }