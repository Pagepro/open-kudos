import { ILocaleTranslations, ITranslationsMapping, Locale } from '../definitions/translationsService'
import enGb from './translations/en-gb'

const translationsMapping: ITranslationsMapping = {
  [Locale.EnGb]: enGb
}

export default class TranslationsService {
  constructor(private locale: Locale = Locale.EnGb) { }

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
