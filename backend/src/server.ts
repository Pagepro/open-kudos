import './common/definitions'
import './common/extensions'
// tslint:disable-next-line
import App from './app'
import Config from './common/consts/config'

const {
  expressApp
} = App
const PORT = Config.port || 3000

expressApp.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Listening on port ${PORT}`)
  // tslint:disable-next-line
  console.log(`App url: http://localhost:${PORT}/`)
})
