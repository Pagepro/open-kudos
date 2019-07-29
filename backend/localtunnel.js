const localtunnel = require('localtunnel')
const axios = require('axios')
const {
  PORT,
  LOCALTUNNEL_DOMAIN
} = process.env

let tunnelInstance = null

const createTunnelIfRequired = async () => {
  if (!tunnelInstance) {
    tunnelInstance = localtunnel(PORT, {
      subdomain: LOCALTUNNEL_DOMAIN
    }, (err, tunnel) => {
      if (err) {
        console.log('Tunnel creation failed: ', err)
      } else {
        console.log(`Started tunneling http://localhost:${PORT} at ${tunnel.url}`)
      }
    })
  } else {
    try {
      await axios.get(`${tunnelInstance.url}/api/test`)
    } catch (_) {
      tunnelInstance = null
    }
  }

  setTimeout(createTunnelIfRequired, 1000)
}

createTunnelIfRequired()
