export interface IGiftTransfer {
  _id: string,
  userId: string,
  giftId: string,
  teamId: string,
  isNewStatus: boolean,
  giftRequestDate?: Date,
  giftReceivedDate?: Date,
  giftName: string,
  giftDescription?: string,
  giftCost: number,
  userName: string
}
