
import Transfer from '../models/transfer'

export function parseGive({ text, user_id: senderId }: { text: string, user_id: string }): Transfer {
    const transfer: Transfer = {
        receiverId: getUserIdFromRaw(text),
        value: getKudosValueFromRaw(text),
        date: new Date(),
        senderId,
        comment: getCommentFromRaw(text)
    }
    return transfer
}

function getCommentFromRaw(rawCommand: string): string {
    // TO DO
    return null
}
function getUserIdFromRaw(rawCommand: string): string {
    const match = /(?<=<@)\w+/.exec(rawCommand)
    if (match) return match[0]
    else return ''
}
function getKudosValueFromRaw(rawCommand: string): number {
    const match = /(?<=\s|^)\d+(?=\s|$)/.exec(rawCommand)
    if (match) return Number(match[0])
    else return NaN
}
export function validateGive(rawCommand: string): boolean {
    // TO DO
    return true
}