import { IGift } from "../../models/gift.model"

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

  public static get initGifts(): IGift[] {
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
}
