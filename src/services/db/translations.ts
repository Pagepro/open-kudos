import { database, CustomDb } from '../../config/mongodb'
import { schema } from '../../models/translation'
import * as translations from '../translations/locales'
import { DictionaryInterface } from '../translations/dictionary'
import { setTranslations } from '../translations'

export function saveTranslation(dictionary: DictionaryInterface) {
    database.then((db: CustomDb) => (
        db.collection('translations').updateOne({
            locale: { $eq: dictionary.locale }
        }, {
            $setOnInsert: dictionary
        }, {
            upsert: true
        }).then(() => (
            setTranslations(dictionary)
        ))
    ))
}

export function initTranslations() {
    database.then((db: CustomDb) => {
        db.createCollection('translations', {
            validator: {
                $jsonSchema: schema
            }
        }).then(() => (
            Promise.all(Object.keys(translations).map(key => (
                saveTranslation((<any>translations)[key])
            )))
        ))
    })
}
