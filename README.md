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
    "nombre": "Ciudad Ejemplo",
    "códigoPostal": "12345"
  },
  "país": {
    "nombre": "País Ejemplo",
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
      "versión": "92.0.4515.107"
    }
  }
}
```

## Cómo Usar la API

Para utilizar la API de geolocalización, realiza una solicitud GET a la siguiente URL:

```
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

def obtener_ubicacion():
    res = requests.get("https://solid-geolocation.vercel.app/location")
    datos = res.json()
    return datos

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

--

<div align="center">
@solidSnk86
</div>
