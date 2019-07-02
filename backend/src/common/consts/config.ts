export default class Config {
  private static CLIENT_ID = 'CLIENT_ID'
  private static CLIENT_SECRET = 'CLIENT_SECRET'
  private static NODE_ENV = 'NODE_ENV'
  private static PORT = 'PORT'
  private static DB_CONNECTION_STRING = 'DB_CONNECTION_STRING'

  private static getEnvVariableByKey (key: string): string {
    const varValue = process.env[key]

    if (varValue === undefined) {
      throw new ReferenceError(
        // tslint:disable-next-line:max-line-length
        `Could not find environment variable with key ${key}! Check your .env file or provided env variables.`
      )
    }

    return varValue
  }

  public static get clientId (): string {
    return Config.getEnvVariableByKey(Config.CLIENT_ID)
  }

  public static get clientSecret (): string {
    return Config.getEnvVariableByKey(Config.CLIENT_SECRET)
  }

  public static get isProduction (): boolean {
    return Config.getEnvVariableByKey(Config.NODE_ENV) === 'production'
  }

  public static get port (): number {
    return Number(Config.getEnvVariableByKey(Config.PORT))
  }

  public static get dbConnectionString (): string {
    return Config.getEnvVariableByKey(Config.DB_CONNECTION_STRING)
  }
}
