export enum SlackCommandType {
  Give,
  Help,
  Balance,
  Gifts,
  Leaderboard
}

export enum SlackEventType {
  MemberJoinedChannel
}

export enum SlackResponseType {
  Hidden = 'hidden',
  General = 'general',
  Standard = 'standard'
}

export enum SlackActionsCallbacks {
  BuyGift = 'buyGift'
}
