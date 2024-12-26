import express from 'express'
import cors from 'cors'
import getNetworkInterfaces from './services/get-network-interfaces.js'
import dotenv from 'dotenv'

const app = express()

app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

dotenv.config()

app.get('/', async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress
    const cityName = req.headers['x-vercel-ip-city']
    const country = req.headers['x-vercel-ip-country']
    const postalCode = req.headers['x-vercel-ip-postal-code']
    const latitude = req.headers['x-vercel-ip-latitude']
    const longitude = req.headers['x-vercel-ip-longitude']
    const timeZone = req.headers['x-vercel-ip-timezone']
    const countryName = timeZone?.split('/')[1]

    const locationInfo = {
      status: res.statusCode,
      ip: clientIp,
      city: {
        name: decodeURIComponent(cityName),
        postal_code: postalCode
      },
      country: {
        name: countryName,
        alpha: country,
        flag: {
          size_1: `https://flagcdn.com/16x12/${country?.toLowerCase()}.png`,
          size_2: `https://flagcdn.com/32x34/${country?.toLowerCase()}.png`,
          size_3: `https://flagcdn.com/48x36/${country?.toLowerCase()}.png`
        },
        time_zone: timeZone,
      },
      network_interfaces: getNetworkInterfaces(),
      coords: {
        latitude: latitude,
        longitude: longitude
      }
    }

    res.status(200).send(
       `<!DOCTYPE html><html lang="en">
  <head>
    <title>Solid Geolocation</title>
    <meta property="og:description" content="Obtiene información detallada de la IP y ubicación." >
    <meta name="color-scheme" content="light dark">
     <link rel="shortcut icon" href="https://raw.githubusercontent.com/solidsnk86/portfolio-mgc-2024/master/public/solidsnk86.png" type="image/x-icon">
    <meta charset="utf-8">
    <script type="module">
      import {
        highlight
      } from 'https://esm.sh/sugar-high'
      const el = document.querySelector('pre > code')
      el.innerHTML = highlight(el.innerText)
    </script>
    <style>
      :root {
        --color: #000000;
        --background-color: #ffffff;
        --sh-class: #000000;
        --sh-identifier: #000000;
        --sh-sign: rgba(0, 0, 0, 0.5);
        --sh-string: #000000;
        --sh-keyword: #000000;
        --sh-comment: #000000;
        --sh-jsxliterals: #000000;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --color: #ffffff;
          --background-color: #000000;
          --sh-class: #ffffff;
          --sh-identifier: #ffffff;
          --sh-sign: rgba(255, 255, 255, 0.5);
          --sh-string: #ffffff;
          --sh-keyword: #ffffff;
          --sh-comment: #ffffff;
          --sh-jsxliterals: #ffffff;
        }
      }

      body {
        background: var(--background-color);
      }

      code {
        font-size: 2vmin;
        font-family: "Operator Mono", "Fira Code", "SF Mono", "Roboto Mono", Menlo,
          monospace;
        line-height: 1.5;
      }

      .solid-corner {
        position: fixed;
        bottom: 0;
        right: 0;
        text-decoration: none;
        color: var(--color);
        font-size: 2vmin;
        font-family: "Operator Mono", "Fira Code", "SF Mono", "Roboto Mono", Menlo,
          monospace; 
        display: flex;
        width: fit-content;
        align-items: center;
        gap: 4px;
      }

      .solid-corner:hover img {
        filter: drop-shadow(0 0 20px #0078D7);
        transition: all 1s ease;
      }
    </style>
  </head>
  <body>
    <pre>
<code>${JSON.stringify(locationInfo, null, 2)}</code>
    </pre>
    <a href="https://github.com/solidsnk86/" target="_blank" rel="noopener noreferrer nofollow" class="solid-corner" aria-label="View profile on GitHub">
      With 💙 by 
      <img src="https://raw.githubusercontent.com/solidsnk86/portfolio-mgc-2024/master/public/solidsnk86.png" alt="Solid Snake PixelArt" style="image-rendering: pixelated;" width="50" height="50" />
    </a>
  </body>
</html>`
    )
    
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ status: res.statusCode, error: 'Error del servidor' })
  }
})

app.get('/weather', async (req, res) => {
  const longitude = req.headers['x-vercel-ip-longitude']
  const latitude = req.headers['x-vercel-ip-latitude']
  try {
    const APIKEY = process.env.NEXT_WEATHER_API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`)
    const jsonData = await response.json()

    if (!response.ok) {
      res.status(400).json({ status: res.statusCode, message: response.statusText })
    }

    res.status(200).json(jsonData)

  } catch(err) {
    res.status(500).json({ status: res.statusCode, message: 'Server Error' + " " + err })
   }
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})