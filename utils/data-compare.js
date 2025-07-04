import { promises as fs } from 'node:fs'
import { readJSON } from './read-json.js'
import path from 'path'
;(async () => {
  const dataWifi_1 = readJSON(
    path.join(process.cwd(), 'utils', 'auto-wifi.json')
  )
  const dataWifi_2 = readJSON(
    path.join(process.cwd(), 'utils', 'hand-data.json')
  )
  const results_1 = Object.keys(dataWifi_1).map((key) => {
    const { name, name5g, MAC, MAC5g, type } = dataWifi_1[key]
    return { name, name5g, MAC, MAC5g, type }
  })
  const results_2 = Object.keys(dataWifi_2).map((key) => {
    const { name, name5g, MAC, MAC5g, type } = dataWifi_1[key]
    return { name, name5g, MAC, MAC5g, type }
  })

  results_1.map((value, index) => {
    if (value.name === results_2[index].name) {
      if (value.MAC5g === results_2[index].MAC5g) {
        if (value.MAC === results_2[index].MAC) {
          if (value.type === results_2[index].type) {
            const text = `Estos datos son iguales:
NOMBRE: ${value.name} <-|-> ${results_2[index].name}
MAC: ${value.MAC} <-|-> ${results_2[index].MAC}
MAC5G: ${value.MAC5g} <-|-> ${results_2[index].MAC5g}
TYPE: ${value.type} <-|-> ${results_2[index].type}  
`
            typeWriter(text.trim())
          }
        }
      }
    } else {
      console.log('Nada po aqui')
    }
  })
})()
