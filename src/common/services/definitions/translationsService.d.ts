export enum Locale {
  en = 'en'
}

export interface ITranslationsMapping {
  [Locale.en]: ILocaleTranslations
}

// We define this interface to make sure that every language implements all of the translations keys
export interface ILocaleTranslations {
  couldntFindThePersonYouWantedToGivePointsTo: string
  forNoReason: string
  hereYouWillFindAllCommandsThatYoucanUse: string
  iCouldntRecognizeThatCommandPleaseUseHelp: string
  xGaveYZPoints: string
  youCantGivePointsToYourself: string
  youDontHaveEnoughKudosToTransfer: string
  youTriedToGiveXPointsButThisIsNotValid: string
}