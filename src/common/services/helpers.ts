export default class Helpers {
  public static getRandomHexColor() {
    return "#" +
      `${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`
  }
}
