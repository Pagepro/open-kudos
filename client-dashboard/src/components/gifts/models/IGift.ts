export interface IGift {
  _id: string,
  name: string,
  description: string,
  amount?: number,
  teamId: string,
  cost: number,
  isAvailable?: boolean,
  files?: FileList
}
