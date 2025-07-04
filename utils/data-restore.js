import { promises as fs } from 'node:fs'
import path from 'node:path'
import { readJSON } from './read-json.js'
;(async () => {
  try {
    const filePath = ({ fileName }) =>
      path.join(process.cwd(), 'utils', fileName)

    const bigWifiData = readJSON(
      path.join(process.cwd(), 'utils', 'big-wifi-data.json')
    )
    const [wifiData] = await Promise.all([
      fetch(
        'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/wifi-sl-v3.json'
      )
        .then((res) => res.json())
        .catch((err) => console.log(err)),
    ])
    console.info('Fetch JSON cdn realizado:', wifiData.length)
    let concaranWifi = []
    let newConcaranWifi = []
    if (!wifiData) throw new Error('Sin datos del cdn')
    if (wifiData.length < 0) throw new Error('Archivo sin datos')
    for (const data of wifiData) {
      if (
        data.name.includes('GobSL-CO') ||
        data.name.includes('WiFi3.0-CO') ||
        data.name.includes('WiFi4.0-CO')
      ) {
        concaranWifi.push(data)
      } else {
        return null
      }

      const formatedData = Object.keys(concaranWifi)
        .map((key) => {
          const { name, name5g, type, MAC, MAC5g, lat, lon } = concaranWifi[key]
          return name
            ? {
                name,
                name5g,
                type,
                MAC,
                MAC5g,
                lat,
                lon,
                location: 'Concarán',
              }
            : null
        })
        .filter(Boolean)
      await fs.writeFile(
        filePath({ fileName: 'hand-data.json' }),
        JSON.stringify(formatedData, null, 2)
      )
    }
    console.log('Comprobaciones del JSON')
    if (!bigWifiData) throw new Error('Sin datos del JSON')
    if (bigWifiData.length < 0) throw new Error('Archivo vacío')
    const concaran = bigWifiData.filter(
      (wifiData) => wifiData.location === 'Concarán'
    )
    await fs.writeFile(
      filePath({ fileName: 'auto-wifi.json' }),
      JSON.stringify(concaran, null, 2)
    )
    console.log('✅ Al parecer ha terminado bien!!')
  } catch (err) {
    console.error('Error:', err)
  } finally {
    console.log('Finalizado')
  }
})()
