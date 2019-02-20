import { Request, Response, NextFunction } from 'express'

function command(req: Request, res: Response, next: NextFunction) {
    res.end('Success')
}

function test(req: Request, res: Response, next: NextFunction) {
    res.send(req.body)
}

export { command, test }