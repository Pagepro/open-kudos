export interface DictionaryInterface {
    TRANSFER_RESPONSE: string,
    NO_REASON: string
    locale?: string
    [key: string]: string
}
const dictionary: DictionaryInterface = {
    TRANSFER_RESPONSE: 'TRANSFER_RESPONSE',
    NO_REASON: 'NO_REASON'
}
export default dictionary
