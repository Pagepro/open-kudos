export function parseGive(rawCommand: string): {} {
    const kudosReceiverId = getUserIdFromRaw(rawCommand)
    const kudosTransactionValue = getKudosValueFromRaw(rawCommand)
    return {
        kudosReceiverId: kudosReceiverId,
        kudosTransactionValue: kudosTransactionValue
    }
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
    return true // rawCommand.trim().split(/\s+/).length == 3
}
