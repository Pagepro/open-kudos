import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class MemberJoinedCommandHandler extends
  BaseSlackCommandHandler {
  public async onHandleCommand() {
    await this.userService.handleUserIfNotExist(this.teamId, this.senderId)
  }
}
