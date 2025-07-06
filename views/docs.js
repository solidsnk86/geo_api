export const docsView = (data) => `
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
      const selectorLanguages = document.getElementById("lang");
      if (codes) {
        codes.forEach((code) => (code.innerHTML = highlight(code.innerText)));
      } else {
        console.log("No se encontró el elemento");
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
        for (const lang of languages) {
          selectorLanguages.innerHTML += \`<option value="\${lang.value}">\${lang.name}</option>\`;
        }
        const options = document.querySelectorAll("option");
        const selector = document.querySelector("select");
        let currentLanguage = 'es';
        selector.onchange = async (event) => {
           try {
              showLoadingIndicator()
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
          } catch (error) {
            console.log("Navegador no compatible con la API Translator")
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
        --navbar-bg: #4a90e2;
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
        background-color: var(--navbar-bg);
        color: #fff;
        padding: 1rem 2rem;
        position: sticky;
        top: 0;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      nav h1 {
        color: #fff;
        font-size: 1.5rem;
        margin: 0;
        text-shadow: 1px 2px 3px #121212;
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
        background: var(--sidebar-bg);
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
        padding: 0.5rem 0;
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

      h1,
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

        h1,
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
    </style>
  </head>
  <body>
    <nav>
      <h1>Documentación API - Solid Geolocation</h1>
      <select name="" id="lang"></select>
    </nav>
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
        <a href="#calculo-distancias">Cálculo de distancias</a>
        <a href="#codigos-estado">Códigos de estado</a>
      </aside>
      <main>
        <section id="introduccion">
          <h2>Introducción</h2>
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
          </p>
        </section>
        <section id="endpoints">
          <h2>Endpoints</h2>
          <h3 id="geolocalizacion-automatica">1. Geolocalización automática</h3>
          <p>
            Este endpoint detecta automáticamente la ubicación del cliente a
            partir de su dirección IP.
          </p>
          <pre>GET /</pre>
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
      © 2024 Solid Geolocation API — Todos los derechos reservados.
    </footer>
  </body>
</html>
`
