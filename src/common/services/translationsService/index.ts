import { ILocaleTranslations, ITranslationsMapping, Locale } from '../definitions/translationsService'
import en from './translations/en'

const translationsMapping: ITranslationsMapping = {
  [Locale.en]: en
}

export default class TranslationsService {
  constructor(private locale: Locale = Locale.en) {}

  private get currentLocaleTranslations() {
    return translationsMapping[this.locale]
  }

  public getTranslation(
    key: keyof ILocaleTranslations,
    ...valuesToInsert: Array<string | number>
  ) {
    return this.currentLocaleTranslations[key].format(...valuesToInsert)
  }
}
