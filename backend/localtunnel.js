const localtunnel = require('localtunnel')

console.log(`Starting tunneling http://localhost:${process.env.PORT} at https://${process.env.LOCALSUBDOMAIN}.localtunnel.me ...`)

localtunnel(process.env.PORT, { subdomain: process.env.LOCALSUBDOMAIN }, err => {
    if (err){
        console.log('Err: ', err)
    } else {
        console.log("Tunneling running on port ", process.env.PORT)
    }
})
