export enum Locale {
  en = 'en'
}

export interface ITranslationsMapping {
  [Locale.en]: ILocaleTranslations
}

// We define this interface to make sure that every language implements all of
// the translations keys
export interface ILocaleTranslations {
  couldntFindThePersonYouWantedToGivePointsTo: string
  forNoReason: string
  hereYouWillFindAllCommandsThatYouCanUse: string
  iCouldntRecognizeThatCommandPleaseUseHelp: string
  xGaveYZPoints: string
  youCantGivePointsToYourself: string
  youDontHaveEnoughKudosToTransfer: string
  youTriedToGiveXPointsButThisIsNotValid: string,
  kudosBalance: string,
  giftsList: string,
  getForKudos: string,
  iCouldntRecognizeThatAction: string,
  youBoughtGift: string,
  youDontHaveEnoughKudosOrGiftOut: string
}
