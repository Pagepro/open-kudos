interface TransferInterface {
    senderId: string,
    receiverId: string,
    value: number,
    date: Date,
    comment?: string
}

export default class Transfer implements TransferInterface {
    senderId: string
    receiverId: string
    value: number
    date: Date
    comment?: string
    constructor(obj: any) {
        this.senderId = obj.senderId,
        this.receiverId = obj.receiverId,
        this.value = obj.value,
        this.comment = obj.comment
    }
}

export const schema = {
    'bsonType': 'object',
    'required': [ 'senderId', 'receiverId', 'value', 'date'],
    'properties': {
        'senderId': {
            'bsonType': 'string',
            'description': 'must be a string and is required'
        },
        'receiverId': {
            'bsonType': 'string',
            'description': 'must be a string and is required'
        },
        'value': {
            'bsonType': 'int',
            'minimum': 0,
            'exclusiveMinimum': true,
            'description': 'must be an integer > 0 and is required'
        },
        'date': {
            'bsonType': 'date',
            'description': 'must be a date and is required'
        },
        'comment': {
            'bsonType': 'string',
            'description': 'must be an string'
        }
    }
}
