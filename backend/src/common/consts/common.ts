import json2csv from "json2csv"
import { IGift } from "../../models/gift.model"
import { IUser } from "../../models/user.model"

export default class CommonConst {
  public static get demoDaysPeriod(): number {
    return 31
  }

  public static get allowedImageSize(): number {
    return 80000
  }

  public static get giftsCountPerPage(): number {
    return 5
  }

  public static get firstPageNumber(): number {
    return 1
  }

  public static get initialGifts(): IGift[] {
    return [
      {
        amount: 10,
        cost: 50,
        description: "",
        name: "iTunes Gift Card $5",
        teamId: ""
      },
      {
        amount: 10,
        cost: 50,
        description: "",
        name: "Google Play Gift Card $5",
        teamId: ""
      },
      {
        amount: 10,
        cost: 250,
        description: "",
        name: "XBox Life Gift Card $25",
        teamId: ""
      },
      {
        amount: 10,
        cost: 500,
        description: "",
        name: "Amazon Gift Card $50",
        teamId: ""
      },
      {
        amount: 10,
        cost: 1000,
        description: "",
        name: "Lunch with CEO",
        teamId: ""
      }
    ]
  }

  public static get userExportFields() : Array<json2csv.FieldInfo<IUser>> {
    return [
      {
        label: 'Name',
        value: 'userName'
      },
      {
        label: 'Kudos to spend',
        value: 'kudosSpendable'
      },
      {
        label: 'Kudos to give',
        value: 'kudosGiveable'
      },
      {
        label: 'Kudos granted',
        value: 'kudosGranted'
      },
    ]
  }
}
