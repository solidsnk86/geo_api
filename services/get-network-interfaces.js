import os from 'os'

function getNetworkInterfaces() {
    const interfaces = os.networkInterfaces()
    const addresses = []
  
    for (const interfaceName in interfaces) {
      interfaces[interfaceName].forEach((inter) => {
        if (inter.family === 'IPv4' && !inter.internal) {
          addresses.push({
            address: inter.address,
            netmask: inter.netmask,
            mac: inter.mac,
            interface: interfaceName
          })
        }
      })
    }
  
    return addresses
}

export default getNetworkInterfaces