import './common/extensions'
// tslint:disable-next-line: ordered-imports
import App from './app'
import Config from './common/consts/config'
import './common/definitions'

const {
  expressApp
} = App
const PORT = Config.port || 3000

expressApp.listen(PORT, () => {
  // tslint:disable: no-console
  console.log(`Listening on port ${PORT}`)
  console.log(`App url: http://localhost:${PORT}/`)
  // tslint:enable: no-console
})
