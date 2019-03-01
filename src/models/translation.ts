import dictionary from '../services/translations/dictionary'

export const schema = {
    'bsonType': 'object',
    'required': [
        'locale'
        , [dictionary.TRANSFER_RESPONSE]
    ],
    'properties': {
        [dictionary.TRANSFER_RESPONSE]: {
            'bsonType': 'string',
            'description': 'Slack bot response in general after making successful transfer'
        }
    }
}
