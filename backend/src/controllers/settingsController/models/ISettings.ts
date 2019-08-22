export default interface ISettings {
  botResponseChannelId: string
}

export enum SettingsEnum {
  BotResponseChannelId = 'botResponseChannelId',
  MonthlyKudosAmount = 'monthlyKudosAmount',
  GiftRequestsReceiver = 'giftRequestsReceiver'
}
