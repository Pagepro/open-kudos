import dictionary, { DictionaryInterface } from '../dictionary'

const translations  = {
    locale: 'default',
    [dictionary.TRANSFER_RESPONSE]: '%sender gave %receiver %value %comment',
    [dictionary.NO_REASON]: 'for no reason',
    [dictionary.NOT_ENOUGH_KUDOS_TO_TRANSFER]: "You don't have enough kudos to transfer",
    [dictionary.NOT_VALID_AMOUNT_ERROR]: 'You try give %points but this is not valid amount of points :(',
    [dictionary.TRANSFER_TO_MYSELF_ERROR]: 'You cant add points for your self :(',
    [dictionary.NO_RECEIVER_ERROR]: "I can't see for who you want to give points :(",
    [dictionary.HELP_RESPONSE]: 'Here you will see all commands that ou can use :)',
    [dictionary.COMMAND_NOT_RECOGNIZED]: "I don't know that command please use help if you want to know all commands"
}
export default translations
