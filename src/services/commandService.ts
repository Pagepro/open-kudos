import KudosTransactionInfo from './kudosTransactionInfo.interface'

export function parseGive(rawCommand: string): KudosTransactionInfo {
    const kudosReceiverId = getUserIdFromRaw(rawCommand)
    const kudosTransactionValue = getKudosValueFromRaw(rawCommand)
    const kudosTransactionInfo: KudosTransactionInfo = {
        kudosReceiverId,
        kudosTransactionValue
    }
    return kudosTransactionInfo
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