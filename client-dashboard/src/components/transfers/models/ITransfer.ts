export interface ITransfer {
  _id: string,
  senderId: string,
  senderName: string
  receiverId: string,
  receiverName: string,
  teamId: string,
  value: number,
  date: string,
  comment?: string
}
