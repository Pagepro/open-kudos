interface UserInterface {
    userSlackId: string,
    kudosGiveable: number,
    kudosGranted: number,
    kudosSpendable: number
}

export default class User implements UserInterface {
    userSlackId: string
    kudosGiveable: number
    kudosGranted: number
    kudosSpendable: number

    constructor() {
        this.kudosGiveable = 0
        this.kudosSpendable = 0
        this.kudosGranted = 0
    }
}

export const schema = {
    'bsonType': 'object',
    'required': [ 'userSlackId', 'kudosGiveable', 'kudosGranted', 'kudosSpendable' ],
    'properties': {
        'name': {
            'bsonType': 'string',
            'description': 'must be a string and is required'
        },
        'kudosGiveable': {
            'bsonType': 'int',
            'minimum': 0,
            'exclusiveMaximum': false,
            'description': 'must be an integer > 0 and is required'
        },
        'kudosGranted': {
            'bsonType': 'int',
            'minimum': 0,
            'exclusiveMaximum': false,
            'description': 'must be an integer > 0 and is required'
        },
        'kudosSpendable': {
            'bsonType': 'int',
            'minimum': 0,
            'exclusiveMaximum': false,
            'description': 'must be an integer > 0 and is required'
        }
    }
}