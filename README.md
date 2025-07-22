# API de Geolocalización

## Descripción

Esta aplicación está construida utilizando Node.js y Express. Proporciona un servicio de geolocalización que devuelve datos de ubicación en formato JSON.

## Características

- **Limitador de Tasa**: La aplicación incluye un limitador de tasa para controlar el número de solicitudes realizadas al endpoint, asegurando un uso justo y previniendo abusos.

## Endpoint

- **GET /location**: Este endpoint devuelve un objeto JSON que contiene información de geolocalización basada en la dirección IP del usuario.

## Ejemplo de Respuesta

```json
{
  "ip": "192.168.1.1",
  "ciudad": {
    "nombre": "Lima",
    "códigoPostal": "15001"
  },
  "país": {
    "nombre": "Perú",
    "alpha": "PE",
    "emojiBandera": "🇵🇪",
    "zonaHoraria": "UTC-5"
  },
  "coordenadas": {
    "latitud": -12.0464,
    "longitud": -77.0428
  },
  "infoDelSistema": {
    "idioma": "es-PE",
    "sistema": "Windows",
    "navegadorWeb": {
      "navegador": "Chrome",
      "versión": "138.0.4515.107"
    }
  }
}
```

## Cómo Usar la API

Para utilizar la API de geolocalización, realiza una solicitud GET a la siguiente URL:

```bash
https://solid-geolocation.vercel.app/location
```

Puedes hacer un `fetch` a este endpoint utilizando JavaScript de la siguiente manera:

```javascript
;(async () => {
  const obtenerUbicacion = async () => {
    try {
      const res = await fetch('https://solid-geolocation.vercel.app/location')
      if (!res.ok) throw new Error('Respuesta fallida' + res.statusText)
      const datos = await res.json()
      return datos
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const json = await obtenerUbicacion()
  console.log(json)
})()
```

- Python:

```python
import requests

def obtener_ubicacion() -> list | None:
  try:
      response = requests.get("https://solid-geolocation.vercel.app/location")
      if response.ok:
          data = response.json()
          return data
      else:
          raise ValueError(f"Error {response.status_code}: {response.text}")
  except Exception as e:
        print(f"HTTP {e}")

if __name__ == "__main__":
    json = obtener_ubicacion()
    print(json)
```

- Python Asíncrono

```python
import asyncio
import httpx

async def obtener_ubicacion():
    async with httpx.AsyncClient() as client:
        res = await client.get("https://solid-geolocation.vercel.app/location")
        datos = res.json()
        return datos

if __name__ == "__main__":
    json = asyncio.run(main=obtener_ubicacion())
    print(json)
```

La respuesta será un objeto JSON similar al ejemplo anterior.

## Uso del end-point por coordenadas

Para utilizar la API de geolocalización, mediante coordenadas tenés que realizar una solicitud GET a la siguiente url:

```bash
https://solid-geolocation.vercel.app/geolocation?lat=<latitud>&lon=<longitud>
```

Para poder hacer uso de éste end-point, se deberá proveer los parmámetros de latitud y longitud. Desde el front-end podemos hacer uso de la api del navegador de geolocalización y realizar el fecth a dicho end-point, dejo éste ejemplo de como podría implementarse:

```javascript
async function getCurrentLocation() {
  return await new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        resolve(coords)
      })
    } else {
      reject(new Error('El navegador no soporta la geolocalización'))
    }
  })
}

async function getApiDataLocation({ latitude, longitude }) {
  return await fetch(
    `https://solid-geolocation.vercel.app/geolocation?lat=${latitude}&lon=${longitude}`
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error.message))
}

const coords = await getCurrentLocation()
const data = await getApiDataLocation({
  latitude: coords.latitude,
  longitude: coords.longitude,
})

console.log(JSON.stringify(data, null, 2))
```

## La respuesta:

```json
{
  "ip": "192.168.0.254",
  "city": "La Toma",
  "type": "Ciudad",
  "departament": "Coronel Pringles",
  "state": "San Luis",
  "country": "Argentina",
  "centerSquare": "0.057mts",
  "coordinates": {
    "latitude": -33.0551991251609,
    "longitude": -65.6178979076542
  },
  "closestAirport": {
    "iata": "LUQ",
    "name": "Brigadier Mayor D Cesar Raul Ojeda Airport",
    "city": "San Luis",
    "state": "San-Luis",
    "country": "AR",
    "distance": "73.022mts"
  }
}
```

Puedes saber a que distancia estás del aeropuerto más cercano y la plaza entral de la ciudad.

### 🌍 Vista en vivo de la web api: <a href="https://solid-geolocation.vercel.app/location">https://solid-geolocation.vercel.app/location</a>

<div align="center">
@solidSnk86 - 2024
</div>
