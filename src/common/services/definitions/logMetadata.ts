import { ISlackAction, ISlackEventInfo } from "../../../controllers/definitions/slackController"

export type LogMetadata = ISlackEventInfo | ISlackAction | object
