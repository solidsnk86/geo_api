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
    <link  />
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

      .github-corner svg {
        fill: var(--color);
        color: var(--background-color);
      }

      .github-corner:hover .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
      }

      @keyframes octocat-wave {

        0%,
        100% {
          transform: rotate(0);
        }

        20%,
        60% {
          transform: rotate(-25deg);
        }

        40%,
        80% {
          transform: rotate(10deg);
        }
      }
    </style>
  </head>
  <body>
    <pre>
<code>${JSON.stringify(locationInfo, null, 2)}</code>
<code class='result'></code>
    </pre>
    <a href="https://github.com/solidsnk86/" target="_blank" rel="noopener noreferrer nofollow" class="github-corner" aria-label="View source on GitHub">
      <svg width="80" height="80" viewBox="0 0 250 250" style="position: absolute; bottom: 0; rotate: 90deg; border: 0; right: 0;" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
      </svg>
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