// tslint:disable:max-line-length
import { ILocaleTranslations } from "../../definitions/translationsService"

export default {
  couldntFindThePersonYouWantedToGivePointsTo: "Couldn't find the person you wanted to give points to :(",
  forNoReason: 'for no reason',
  getForKudos: "Get for {0} Kudos",
  giftsList: 'There are the list of gifts you can buy',
  hereYouWillFindAllCommandsThatYouCanUse: 'Happy to help, below a list of commands that you can currently use:\n\n*@kudos give @person 10 for helping with code review.*\n- This is the main feature of the bot.\n- The message structure: @kudos give @pointsReceiver [number of points] for [reason]\n- You can give some points to somebody for some reason or without reason.\n- Message with points without reason: @kudos give @pointsReceiver 10\n\n*@kudos balance* - this command returns your current balance of points\n\n*@kudos gifts* - this command displays a list of gifts that you can get after exchanging your received points.\n\n*@kudos help* - I guess you already know how it works.',
  iCouldntRecognizeThatAction: "I couldn't recognize that action, please contact the administrator",
  iCouldntRecognizeThatCommandPleaseUseHelp: "I couldn't recognize that command please use help to see the list of commands",
  kudosBalance: `Here is your current balance \n\n*Giveable Balance*\n{0} Kudos\nGiveable balances reset at the beginning of the month. Use 'em or lose 'em\n\n*Spendable Balance*\n{1} Kudos \nSpendable Kudos never expire. Use them to buy cool things in the store`,
  xGaveYZPoints: '<@{1}> just received *{2}* kudos from <@{0}> {3}.',
  youBoughtGift: `You've purchased *{0}* for {1} kudos. Please contact the office manager to collect the gift`,
  youCantGivePointsToYourself: 'You cant add points for yourself :(',
  youDontHaveEnoughKudosOrGiftOut: `You don't have enough kudos to buy a gift or the gift is out of stock :(`,
  youDontHaveEnoughKudosToTransfer: `You don't have enough kudos to transfer`,
  youTriedToGiveXPointsButThisIsNotValid: 'You tried to give {0} but this is not valid amount of points :('
} as ILocaleTranslations
