import { Request, Response, NextFunction} from 'express'

function command(req: Request, res: Response, next: NextFunction){
    res.end('Success')
}

export { command }