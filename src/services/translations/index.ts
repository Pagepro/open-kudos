import { DictionaryInterface } from './dictionary'

const translationSet: any = {}
export function setTranslations(dictionary: DictionaryInterface) {
    translationSet[dictionary.locale] = dictionary
}

export default function getText(phrase: keyof DictionaryInterface, config: any = {}): string {
    return Object.keys(config).reduce((prev, key) => (
        prev.replace(`%${key}`, config[key])
    ), (<string>translationSet[config.locale || 'default'][phrase] || translationSet.default[phrase]))
}
