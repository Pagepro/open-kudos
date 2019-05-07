import BaseSlackEventHandler from "./baseSlackEventHandler"

export default class MemberJoinedEventHandler extends
  BaseSlackEventHandler {
  public async onHandleEvent() {
    await this.userService.handleUserIfNotExist(this.teamId, this.senderId)
  }
}
