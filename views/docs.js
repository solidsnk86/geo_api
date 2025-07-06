export const docsView = () => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <title>Documentación API - Solid Geolocation</title>
    <script type="module">
      import { highlight } from "https://esm.sh/sugar-high";

      const codes = document.querySelectorAll("pre");
      if (codes) {
       codes.forEach((code) => code.innerHTML = highlight(code.innerText))
      } else {
        console.log("No se encontró el elemento")
      }
    </script>
    <style>
      :root {
        --color: #000000;
        --background-color: #ffffff;
        --sh-class: #000000;
        --sh-identifier: #000000;
        --sh-sign: #00000080;
        --sh-string: #0e0e0e;
        --sh-token-string: lightgreen;
        --sh-keyword: #000000;
        --sh-comment: #000000;
        --sh-jsxliterals: #000000;
        --dialog-bg: #f5f5f5;
        --border-color: #e6e6e6;
        --shadow: #9d9d9d;
        --footer-bg: #f1f5f9;
        --footer-color: #4a90e2;
      }
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        background-color: #f9fafb;
        color: #333;
      }
      header {
        background-color: #4a90e2;
        color: #fff;
        padding: 1rem;
        text-align: center;
      }
      .container {
        max-width: 900px;
        margin: 2rem auto;
        background: #fff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1,
      h2,
      h3 {
        color: #4a90e2;
      }
      code {
        background: #eee;
        padding: 2px 4px;
        border-radius: 4px;
        font-family: monospace;
      }
      pre {
        background: #f4f4f4;
        padding: 1rem;
        border-left: 4px solid #4a90e2;
        overflow-x: auto;
        white-space: pre-wrap;
      }
      section {
        margin-bottom: 2rem;
      }
      a {
        color: #4a90e2;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --color: #ffffff;
          --background-color: #000000;
          --sh-class: #ffffff;
          --sh-identifier: #ffffff;
          --sh-sign: #6495ed;
          --sh-string: #ffffff;
          --sh-token-string: lightgreen;
          --sh-keyword: lightgreen;
          --sh-comment: #ffffff;
          --sh-jsxliterals: #ffffff;
          --dialog-bg: #202020;
          --border-color: #333;
          --shadow: #000;
          --footer-bg: #a9d0f7b8;
          --footer-color: #1e64b3;
        }
        body {
          background-color: #121212;
          color: #e0e0e0;
        }
        header {
          background-color: #4a90e2;
          color: #f1f1f1;
        }
        .container {
          background: #1e1e1e;
          color: #e0e0e0;
        }
        h1,
        h2,
        h3 {
          color: #60a5fa;
        }
        code {
          background: #2c2c2c;
          color: #f1f1f1;
        }
        pre {
          background: #141414;
          border-left-color: #60a5fa;
          color: #e0e0e0;
        }
        a {
          color: #93c5fd;
        }
        a:hover {
          color: #bfdbfe;
        }
        footer {
          background-color: #1e1e1e;
          color: #60a5fa;
          border-top: 1px solid #2c2c2c;
        }
      }
    </style>
  </head>

  <body>
    <header>
      <h1 style="color: #fff">Documentación de la API: Solid Geolocation 🌎</h1>
    </header>

    <div class="container">
      <section>
        <h2>Introducción</h2>
        <p>
          La API <strong>Solid Geolocation</strong> permite obtener información
          geográfica basada en IP o coordenadas (latitud/longitud). A
          continuación se detallan los endpoints disponibles, su uso y ejemplos
          de respuesta.
        </p>
      </section>

      <section>
        <h2>Base URL</h2>
        <p><code>https://solid-geolocation.vercel.app/</code></p>
      </section>

      <section>
        <h2>Límites de uso</h2>
        <p>
          Cada IP cliente tiene un límite de
          <strong>100 peticiones por hora</strong>.
        </p>
      </section>

      <section>
        <h2>Endpoints</h2>

        <h3>1. Geolocalización automática</h3>
        <p>
          Este endpoint detecta automáticamente la ubicación del cliente a
          partir de su dirección IP.
        </p>
        <pre>GET /</pre>

        <p><strong>Respuesta de ejemplo:</strong></p>
        <pre calss="pre">
{
  "ip": "45.178.0.81",
  "city": {
    "name": "San Luis",
    "postalCode": "5700"
  },
  "country": {
    "name": "Argentina",
    "alpha": "AR",
    "emojiFlag": "🇦🇷",
    "timezone": "America/Argentina/San_Luis"
  },
  "coords": {
    "latitude": "-33.2991",
    "longitude": "-66.3547"
  },
  "sysInfo": {
    "language": "en-US",
    "system": "Windows",
    "webBrowser": {
      "browser": "Not A Brand",
      "version": "8"
    }
  }
}</pre
        >

        <h3>2. Geolocalización por coordenadas</h3>
        <p>
          Este endpoint permite obtener información de ubicación enviando
          latitud y longitud como parámetros en la URL.
        </p>
        <pre>GET /geolocation?lat=&lt;LATITUD&gt;&lon=&lt;LONGITUD&gt;</pre>

        <p><strong>Ejemplo de uso:</strong></p>
        <a
          href="https://solid-geolocation.vercel.app/geolocation?lat=-33.0548161&lon=-65.6174943"
        >
          https://solid-geolocation.vercel.app/geolocation?lat=-33.0548161&lon=-65.6174943
        </a>

        <p><strong>Respuesta de ejemplo:</strong></p>
        <pre class="pre">
{
  "city": "Carpintería",
  "type": "Villa Turística",
  "departament": "Junín",
  "state": "San Luis",
  "country": "Argentina",
  "centerSquare": "5.366mts",
  "coordinates": {
    "latitude": -32.410147547291,
    "longitude": -65.0100090777743
  },
  "closestAirport": {
    "iata": "RLO",
    "name": "Valle Del Conlara International Airport",
    "city": "Merlo",
    "state": "San-Luis",
    "country": "AR",
    "distance": "17.116mts"
  }
}</pre
        >
      </section>

      <section>
        <h2>Cálculo de distancias</h2>
        <p>
          La API utiliza la <strong>fórmula de Haversine</strong> para calcular
          distancias geodésicas entre dos puntos en la superficie terrestre.
          Este método toma en cuenta la curvatura de la Tierra para dar una
          distancia aproximada en metros entre las coordenadas consultadas y:
        </p>
        <ul>
          <li>
            La <strong>plaza central</strong> de la ciudad detectada (cuando
            exista una registrada).
          </li>
          <li>
            El <strong>aeropuerto más cercano</strong> a las coordenadas
            proporcionadas.
          </li>
        </ul>

        <p>
          Por ejemplo, en la respuesta de
          <code>/geolocation?lat=&lt;LAT&gt;&lon=&lt;LON&gt;</code> encontrarás:
        </p>

        <pre class="pre">
{
  "centerSquare": "5.366mts",
  "closestAirport": {
    "name": "Valle Del Conlara International Airport",
    "distance": "17.116mts"
  }
}</pre
        >

        <p>
          Estos valores indican que desde las coordenadas proporcionadas estás a
          <code>5.366 metros</code> de la plaza central de Carpintería y a
          <code>17.116 metros</code> del aeropuerto más cercano.
        </p>

        <p>
          La fórmula de Haversine calcula la distancia en línea recta mínima, no
          la distancia por carretera, y es una aproximación estándar usada en
          geolocalización.
        </p>
      </section>

      <section>
        <h2>Códigos de estado</h2>
        <ul>
          <li><code>200 OK</code> – Petición exitosa.</li>
          <li>
            <code>400 Bad Request</code> – Parámetros inválidos o faltantes.
          </li>
          <li>
            <code>429 Too Many Requests</code> – Se ha superado el límite de
            peticiones por hora.
          </li>
          <li>
            <code>500 Internal Server Error</code> – Error en el servidor.
          </li>
        </ul>
      </section>
    </div>
    <footer style="
  background-color: var(--footer-bg);
  color: var(--footer-color);
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  margin-top: 2rem;
  border-top: 1px solid #e2e8f0;
">
  © 2024 Solid Geolocation API — Todos los derechos reservados.
</footer>
  </body>
</html>
`
