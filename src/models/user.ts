interface UserInterface {
    userSlackId: string,
    kudosGiveable: number,
    kudosGranted: number,
    kudosSpendable: number,
    name: string,
    realName: string,
    isAdmin: boolean
}

export default class User implements UserInterface {
    userSlackId: string
    kudosGiveable: number
    kudosGranted: number
    kudosSpendable: number
    name: string
    realName: string
    isAdmin: boolean

    constructor(obj: any) {
        this.kudosGiveable = obj.kudosGiveable || 100
        this.kudosSpendable = obj.kudosSpendable || 0
        this.kudosGranted = obj.kudosGranted || 0
        this.userSlackId = obj.userSlackId || obj.id,
        this.name = obj.name,
        this.realName = obj.realName || obj.real_name,
        this.isAdmin = obj.isAdmin || obj.is_admin

    }
}

export const schema = {
    'bsonType': 'object',
    'required': [ 'userSlackId', 'kudosGiveable', 'kudosGranted', 'kudosSpendable', 'isAdmin' ],
    'properties': {
        'name': {
            'bsonType': 'string',
            'description': 'must be a string and is required'
        },
        'kudosGiveable': {
            'bsonType': 'int',
            'minimum': 0,
            'exclusiveMinimum': false,
            'description': 'must be an integer > 0 and is required'
        },
        'kudosGranted': {
            'bsonType': 'int',
            'minimum': 0,
            'exclusiveMinimum': false,
            'description': 'must be an integer > 0 and is required'
        },
        'kudosSpendable': {
            'bsonType': 'int',
            'minimum': 0,
            'exclusiveMinimum': false,
            'description': 'must be an integer > 0 and is required'
        },
        'isAdmin': {
            'bsonType': 'bool',
            'description': 'must be an boolean and is required'
        }
    }
}