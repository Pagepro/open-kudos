const localtunnel = require('localtunnel')
console.log(`Start tunneling localhost: ${process.env.PORT} at https://${process.env.LOCALSUBDOMAIN}.localtunnel.me`)
localtunnel(process.env.PORT, { subdomain: process.env.LOCALSUBDOMAIN }, (err, tunnel) => {
    if (err){
        console.log('Err: ', err)
    } else {
        console.log("Tunneling goingOn ", process.env.PORT)
    }
})