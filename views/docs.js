export const docsView = (data) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
     <link
      rel="shortcut icon"
      href="https://raw.githubusercontent.com/solidsnk86/portfolio-mgc-2024/master/public/solidsnk86.png"
      type="image/x-icon"
    />
    <title>Documentación API - Solid Geolocation</title>
    <script type="module">
      import { highlight } from "https://esm.sh/sugar-high";

      document.getElementById("home").addEventListener("click", () => window.open("/"));

      const codes = document.querySelectorAll("pre");
      const selectorLanguages = document.getElementById("lang");
      if (codes) {
        codes.forEach((code) => (code.innerHTML = highlight(code.innerText)));
      }
      const languages = [
        { name: "Español", value: "es" },
        { name: "中文 (Chino)", value: "zh" },
        { name: "English", value: "en" },
        { name: "हिन्दी (Hindi)", value: "hi" },
        { name: "العربية (Árabe)", value: "ar" },
        { name: "Português", value: "pt" },
        { name: "Русский", value: "ru" },
        { name: "اردو (Urdu)", value: "ur" },
        { name: "Bahasa Indonesia", value: "id" },
        { name: "Deutsch", value: "de" },
        { name: "日本語 (Japonés)", value: "ja" },
        { name: "한국어 (Coreano)", value: "ko" },
        { name: "Italiano", value: "it" },
        { name: "Türkçe", value: "tr" },
        { name: "فارسی (Persa)", value: "fa" },
        { name: "Tiếng Việt", value: "vi" },
        { name: "ไทย (Tailandés)", value: "th" },
        { name: "Nederlands", value: "nl" },
        { name: "Polski", value: "pl" },
        { name: "Українська", value: "uk" },
        { name: "Svenska", value: "sv" },
        { name: "Norsk", value: "no" },
        { name: "Dansk", value: "da" },
        { name: "עברית (Hebreo)", value: "he" },
        { name: "Română", value: "ro" },
      ];
      for (const lang of languages) {
          selectorLanguages.innerHTML += \`<option value="\${lang.value}">\${lang.name}</option>\`;
      }
      function showLoadingIndicator(show = true, text = "Traduciendo...") {
        let loader = document.getElementById('translation-loader');
        if (show && !loader) {
          loader = document.createElement('div');
          loader.id = 'translation-loader';
          loader.innerHTML = \`
            <div style="
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: rgba(0,0,0,0.8);
              color: white;
              padding: 20px;
              border-radius: 8px;
              z-index: 9999;
              font-family: Arial, sans-serif;
            ">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="
                  width: 20px;
                  height: 20px;
                  border: 2px solid #fff;
                  border-top: 2px solid transparent;
                  border-radius: 50%;
                  animation: spin 1s linear infinite;
                "></div>
                <span id="text">\${text}</span>
              </div>
            </div>
            <style>
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
          \`;
          document.body.appendChild(loader);
        } else if (!show && loader) {
          loader.remove();
        }
      }
      document.addEventListener("DOMContentLoaded", async () => {
        const options = document.querySelectorAll("option");
        const selector = document.querySelector("select");
        let currentLanguage = 'es';
        selector.onchange = async (event) => {
           showLoadingIndicator()
           try {
              if (!self.Translator || typeof self.Translator.create !== 'function') {
                  alert("Tu navegador no soporta la API Translator.");
                  return;
              }
              if ('Translator' in self) {
                  const traductor = await Translator.create({
                    sourceLanguage: currentLanguage,
                    targetLanguage: event.target.value,
                  });
                  const loaderText = document.getElementById("text");
                  const traduction = await traductor.translate(loaderText.innerText);
                  loaderText.innerText = traduction;
                  currentLanguage = event.target.value;
                  const h1Element = document.querySelector("h1");
                  const h2Elements = document.querySelectorAll("h2");
                  const h3Elements = document.querySelectorAll("h3");
                  const allParagraphs = document.querySelectorAll("p");
                  const aElements = document.querySelectorAll("a");
                  const liElements = document.querySelectorAll("li");
                  const footer = document.querySelector("footer");
                  h1Element.innerText = await traductor.translate(h1Element.innerText);
                  h2Elements.forEach(async (el) => (el.innerText = await traductor.translate(el.innerText)));
                  h3Elements.forEach(async (el) => (el.innerText = await traductor.translate(el.innerText)));
                  allParagraphs.forEach(async (el) => (el.innerText = await traductor.translate(el.innerText)));
                  aElements.forEach(async (el) => (el.innerText = await traductor.translate(el.innerText)));
                  liElements.forEach(async (el) => (el.innerText = await traductor.translate(el.innerText)));
                  footer.innerText = await traductor.translate(footer.innerText);
                  showLoadingIndicator(false)
              } else {
                  alert("Tu versión de navegador no está actualizada!")
                  showLoadingIndicator(false); 
              }
          } catch (error) {
            console.log("Navegador no compatible con la API Translator")
          } finally {
             showLoadingIndicator(false);
          }
        };
        const links = document.querySelectorAll('aside a[href^="#"]');
        links.forEach((link) => {
          link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          });
        });
      });
    </script>
    <style>
      :root {
        --color: #000000;
        --background-color: #ffffff;
        --sh-class: #E5C049;
        --sh-identifier: #61AFEF;
        --sh-sign: #D19045;
        --sh-string: #98C35B;
        --sh-token-string: lightgreen;
        --sh-keyword: #C678DD;
        --sh-comment: #ffffff;
        --sh-property: #E05A50;
        --sh-jsxliterals: #61AFEF;
        --dialog-bg: #f5f5f5;
        --border-color: #e6e6e6;
        --shadow: #9d9d9d;
        --footer-bg: #f1f5f9;
        --footer-color: #4a90e2;
        --sidebar-bg: #f8fafc;
        --sidebar-border: #e2e8f0;
        --main-bg: #ffffff;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: Arial, sans-serif;
        background-color: #f9fafb;
        color: #333;
        line-height: 1.6;
      }
      nav {
        display: flex;
        justify-content: space-between;
        padding: 1rem 2rem;
        z-index: 1000;
        border-bottom: 1px solid var(--border-color);
      }
      nav h3 {
        color: var(--color);
        margin: 0;
        display: flex;
        font-weight: 800;
        align-items: center;
        gap: 8px;
      }
      .heading-container {
        display: flex;
        justify-content: center;
        margin: 24px auto 0 24px;
      }
      h1 {
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif;
        font-size: 10.3vmin;
        font-weight: 900;
        line-height: 54.8953px;
        mask-image: url("https://raw.githubusercontent.com/solidsnk86/geo_api/refs/heads/master/assets/grunge.png");
        mask-size: cover;
        mask-repeat: repeat;
        mask-position: 0% 0%; 
        max-inline-size: 671.016px;
        max-width: 671.016px;
        text-wrap-style: balance;
        word-break: break-word;
        animation: fade 0.7s ease-in;
      }
      @keyframes fade { 
          0% {
            transform: translateY(-200%) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateY(0) scale(0.5);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
      }
      .container {
        display: flex;
        min-height: calc(100vh - 80px);
        max-width: 1200px;
        margin: 0 auto;
        gap: 2rem;
        padding: 2rem;
      }
      aside {
        flex: 0 0 250px;
        background: var(--main-bg);
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        height: fit-content;
        position: sticky;
        top: 100px;
      }
      aside h3 {
        color: #4a90e2;
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }
      aside ul {
        list-style: none;
      }
      aside li {
        margin-bottom: 0.5rem;
      }
      aside a {
        color: #374151;
        text-decoration: none;
        padding: 0.5rem;
        display: block;
        border-radius: 4px;
        transition: all 0.2s;
      }
      aside a:hover {
        color: #4a90e2;
        background-color: #e5f3ff;
      }
      main {
        flex: 1;
        background: var(--main-bg);
        padding: 2rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
      }
      h2,
      h3 {
        color: #4a90e2;
        margin-bottom: 1rem;
        cursor: default;
      }
      h2 {
        margin-top: 2rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #e5f3ff;
      }
      section {
        margin-bottom: 2rem;

        & div {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: small;
        }

        & time {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          font-size: small;
        }
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
        border-radius: 4px;
        margin: 1rem 0;
      }
      a {
        color: #4a90e2;
        text-decoration: none;
      }
      ul {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
      }
      li {
        margin-bottom: 0.5rem;
      }
      select {
        padding: 3px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
      }
      footer {
        background-color: var(--footer-bg);
        color: var(--footer-color);
        text-align: center;
        padding: 1rem;
        font-size: 0.9rem;
        border-top: 1px solid var(--border-color);
      }
      @media (max-width: 768px) {
        .container {
          flex-direction: column;
          padding: 1rem;
        }
        aside {
          flex: none;
          position: static;
          order: -1;
        }
        nav {
          padding: 1rem;
        }
        nav h1 {
          font-size: 1.2rem;
        }
        main {
          padding: 1.5rem;
        }
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --color: #ffffff;
          --background-color: #000000;
          --sh-class: #E5C05D;
          --sh-identifier: #61AFEF;
          --sh-sign: #D19045;
          --sh-string: #98C35B;
          --sh-token-string: lightgreen;
          --sh-keyword: #C678DD;
          --sh-comment: #ffffff;
          --sh-property: #E05A50;
          --sh-jsxliterals: #ffffff;
          --dialog-bg: #202020;
          --border-color: #333;
          --shadow: #000;
          --footer-bg: #1e1e1e;
          --footer-color: #60a5fa;
          --navbar-bg: #1e40af;
          --sidebar-bg: #1e1e1e;
          --sidebar-border: #374151;
          --main-bg: #1e1e1e;
        }
        body {
          background-color: #121212;
          color: #e0e0e0;
        }
        aside a {
          color: #d1d5db;
          padding-inline: 6px;
        }
        aside a:hover {
          color: #60a5fa;
          background-color: #1e3a8a;
        }
        h2,
        h3 {
          color: #60a5fa;
        }
        h2 {
          border-bottom-color: var(--border-color);
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
      }
      #breadcrumbs {
        display: flex;
        font-weight: 600;
        gap: 12px;
        color: var(--color);
        opacity: 0.7;

        & a {
          color: var(--color);
        }
        & a:hover {
          text-decoration: underline;
        }
      }
      .lang {
        display: flex;
        align-items: center;
        gap: 8px;  
      }
    </style>
  </head>
  <body>
    <nav>
      <h3 id="home">Solid Geolocation</h3>
      <div class="lang">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6" width="26" height="26"
      style="transform: translateY(-1px); opacity: 0.6;">
      <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
      </svg>
      <select name="" id="lang"></select>
      </diV>
    </nav>
    <div class="heading-container">
    <h1>Documentación de la API Solid Geolocation</h1>
    </div>
    <div class="container">
      <aside>
        <h3>Índice</h3>
        <a href="#introduccion">Introducción</a>
        <a href="#base-url">Base URL</a>
        <a href="#limites">Límites de uso</a>
        <a href="#endpoints">Endpoints</a>
        <a href="#geolocalizacion-automatica">Geolocalización automática</a>
        <a href="#geolocalizacion-coordenadas"
          >Geolocalización por coordenadas</a
        >
        <a href="#uso-coordenadas">Uso por coordenadas</a>
        <a href="#calculo-distancias">Cálculo de distancias</a>
        <a href="#codigos-estado">Códigos de estado</a>
      </aside>
      <main>
      <div id="breadcrumbs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="22" height="22">
            <path stroke-linecap="round" stroke-linejoin="round" fill="currenColor" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>  
          <a href="/">Inicio</a> / <a href="https://solid-geolocation.vercel.app/docs">Docs</a>
        </div>
        <section id="introduccion">
          <h2>Introducción</h2>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" 
          fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="18" height="18" 
          style="transform: translateY(-1px); opacity: 0.6;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          4 min lectura
          </div>
          <time>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="18" height="18"
          style="transform: translateY(-1px); opacity: 0.6;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          ${new Date('February, 27 2025').toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</time>
          <p>
            La API <strong>Solid Geolocation</strong> permite obtener
            información geográfica basada en IP o coordenadas
            (latitud/longitud). A continuación se detallan los endpoints
            disponibles, su uso y ejemplos de respuesta.
          </p>
        </section>
        <section id="base-url">
          <h2>Base URL</h2>
          <p><code>https://solid-geolocation.vercel.app/</code></p>
        </section>
        <section id="limites">
          <h2>Límites de uso</h2>
          <p>
            Cada IP cliente tiene un límite de
            <strong>100 peticiones por hora</strong>.
            Si ha sobrepasado el límite dentro de la hora, deberá esperar el tiempo que sea necesario para poder hacer llamadas a la API.
          </p>
        </section>
        <section id="endpoints">
          <h2>Endpoints</h2>
          <h3 id="geolocalizacion-automatica">1. Geolocalización automática</h3>
          <p>
            Este endpoint detecta automáticamente la ubicación del cliente a
            partir de su dirección IP.
          </p>
          <pre>GET /location</pre>
          <p><strong>Respuesta de la API:</strong></p>
          <pre class="pre">${JSON.stringify(data, null, 2)}</pre>
          <h3 id="geolocalizacion-coordenadas">
            2. Geolocalización por coordenadas
          </h3>
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
        </section>
        <section id="uso-coordenadas">
          <h2>Uso del end-point con coordenadas</h2>
           <p>
            Para poder hacer uso de éste <strong>end-point</strong>, se deberá proveer los parmámetros de <code>latitud</code> y <code>longitud</code>.
            Desde el front-end podemos hacer uso de la api del navegador de geolocalización y realizar el fecth a dicho end-point, dejo éste ejemplo de
            como podría implementarse:
          </p>
          <pre>
async function getCurrentLocation() {
  return await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
          const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
          };
          resolve(coords);
        });
        } else {
          reject(new Error("Navigator doesn't allowed geolocation"));
    }
  });
}

async function getApiDataLocation({ latitude, longitude }) {
    return await fetch(
      \`https://solid-geolocation.vercel.app/geolocation?lat=\${latitude}&lon=\${longitude}\`)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => console.log(error.message));
}

const coords = await getCurrentLocation();
const data = await getApiDataLocation({
  latitude: coords.latitude,
  longitude: coords.longitude,
});

console.log(JSON.stringify(data, null, 2));
        </pre>
                  <p><strong>Respuesta de ejemplo:</strong></p>
          <pre class="pre">
{
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
          </pre>
        </section>
        <section id="calculo-distancias">
          <h2>Cálculo de distancias</h2>
          <p>
            La API utiliza la <strong>fórmula de Haversine</strong> para
            calcular distancias geodésicas entre dos puntos en la superficie
            terrestre. Este método toma en cuenta la curvatura de la Tierra para
            dar una distancia aproximada en metros entre las coordenadas
            consultadas y:
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
            <code>/geolocation?lat=&lt;LAT&gt;&lon=&lt;LON&gt;</code>
            encontrarás:
          </p>
          <pre class="pre">
{
  "centerSquare": "5.366mts",
  "closestAirport": {
      "name": "Valle Del Conlara International Airport",
      "distance": "17.116mts"
  }
}</pre>
          <p>
            Estos valores indican que desde las coordenadas proporcionadas estás
            a
            <code>5.366 metros</code> de la plaza central de Carpintería y a
            <code>17.116 metros</code> del aeropuerto más cercano.
          </p>
          <p>
            La fórmula de Haversine calcula la distancia en línea recta mínima,
            no la distancia por carretera, y es una aproximación estándar usada
            en geolocalización.
          </p>
        </section>
        <section id="codigos-estado">
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
      </main>
    </div>
    <footer>
      © 2024 Solid Geolocation API — 100% hecha por un humano.
    </footer>
  </body>
</html>
`
