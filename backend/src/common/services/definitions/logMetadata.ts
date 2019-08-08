import { ISlackActionBlock, ISlackEventInfo } from "../../../controllers/definitions/slackController"

export type LogMetadata = ISlackEventInfo | ISlackActionBlock | object
