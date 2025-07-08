export const mainView = ({ data, fx = () => {} }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solid Geolocation</title>
    <meta
      property="og:description"
      content="Obtiene información detallada de la IP y ubicación."
    />
    <meta
      property="og:image"
      content="https://raw.githubusercontent.com/solidsnk86/calcagni-gabriel/refs/heads/master/public/screen-geolocation_api.png"
    />
    <meta name="color-scheme" content="light dark" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <link
      rel="shortcut icon"
      href="https://raw.githubusercontent.com/solidsnk86/portfolio-mgc-2024/master/public/solidsnk86.png"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
      :root {
        --color: #000000;
        --background-color: #f5f5f5;
        --sh-class: #E5C049;
        --sh-identifier: #61AFEF;
        --sh-sign: #D19045;
        --sh-string: #98C35B;
        --sh-token-string: lightgreen;
        --sh-keyword: #C678DD;
        --sh-comment: #ffffff;
        --sh-property: #E05A50;
        --sh-jsxliterals: #61AFEF;
        --bg-main: #ffffff;
        --bg-desk: #2f3542;
        --win-bg: #f5f5f7;
        --dialog-bg: #f5f5f5;
        --border-color: #e6e6e6;
        --shadow: #9d9d9d;
        --btn-bg: #010101;
        --btn-color: #fff;
        --card-bg: #eee;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --color: #ffffff;
          --background-color: #000000;
          --sh-identifier: #61AFEF;
          --sh-sign: #D19045;
          --sh-string: #98C35B;
          --sh-token-string: lightgreen;
          --sh-keyword: #C678DD;
          --sh-comment: #ffffff;
          --sh-property: #E05A50;
          --sh-jsxliterals: #ffffff;
          --bg-desk: #000000;
          --win-bg: #2a2a2a;
          --bg-main: #1e1e1e;
          --dialog-bg: #202020;
          --border-color: #383838;
          --shadow: #000;
          --btn-bg: #f5f5f5;
          --btn-color: #000;
          --card-bg: #333;
        }
      }
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--background-color);
        font-family: "Poppins", sans-serif;
      }
      button {
        padding: 8px 12px;
        border-radius: 50px;
        border: 1px solid var(--border-color);
        background-color: var(--btn-bg);
        color: var(--btn-color);
        font-weight: 600;
        transition: 0.2s ease-in-out;
      }
      button:hover {
        opacity: 0.8;
        cursor: copy;
        transform: scale(1.05);
        border-color: #007aff;
      }
      .window {
        flex: 0 0 800px;
        width: 90%;
        max-width: 800px;
        height: 95%;
        display: flex;
        flex-direction: column;
        background: var(--win-bg, #f5f5f7);
        border-radius: 12px;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
        overflow: hidden;
      }
      .browser-bar {
        background: var(--card-bg);
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid var(--border-color);
      }
      .nav-btn {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
      }
      .nav-btn:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      .address-bar {
        flex: 1;
        display: flex;
        align-items: center;
        background: #fff;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 14px;
        color: #333;
        overflow: hidden;
      }
      .address-bar span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .content {
        flex: 1;
        display: flex;
        background: var(--bg-main, #ffffff);
        border-inline: 1px solid var(--border-color);
      }
      .pane {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 8px;
      }
      .json-window {
        flex: 1;
        background: #1e1e1e;
        color: #c5c5c5;
        text-shadow: 0 0 2px lightgreen;
        padding: 12px;
        font-family: Menlo, Monaco, monospace;
        border-radius: 4px;
        overflow: auto;
      }
      #map {
        flex: 1;
        border-radius: 4px;
        margin: 8px;
        animation: slide 1s ease-in;
      }
        @keyframes slide {
          from {
            transform: translateX(200%) scale(0);
          }
          to {
            transform: translateX(0) scale(1);
          }
        }
      .footer {
        padding: 8px 16px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .footer a {
        color: #007aff;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: .2s ease-in-out;
        height: 20px;
      }
      .footer a:hover {
        text-shadow: 0px 0px 1px #000;
        filter: drop-shadow(0 0 10px #007aff) blur(0.5px);
      }
      dialog {
        padding: 16px;
        border: none;
        border-radius: 4px;
        animation: fadeIn 0.2s ease-in-out;
        z-index: 999;
      }
      #dialog {
        display: none;
        position: absolute;
        width: 50%;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        padding: 16px;
        background-color: var(--dialog-bg);
        border: 1px solid var(--border-color);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        z-index: 999;
        filter: drop-shadow(0 0 10px var(--shadow));
        animation: entrance 0.6s ease-in-out;
        font-size: 14px;
        font-family: "Inter", "Segoe UI", Roboto, sans-serif;
        overflow: hidden;
        text-wrap: balance;
      }
      #dialog h2 {
        font-size: 1.4rem;
        margin-bottom: 16px;
        display: flex;
        gap: 10px;
        align-items: center;
        margin: 0;

        & #chin {
          padding: 2px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--card-bg);
        }
      }
      #dialog a {
        text-decoration: none;
        color: #6495ed;
      }
      #dialog a:hover {
        text-decoration: underline;
      }
      @keyframes entrance {
        from {
          transform: translateY(-500%);
        }
        to {
          transform: translateY(0);
        }
      }
      @keyframes exit {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(0);
        }
      }
      @keyframes fadeIn {
        from {
          transform: translateY(500%);
        }
        to {
          transform: translateY(0);
        }
      }
      @keyframes fadeOut {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(500%);
        }
      }
      @media (width <= 762px) {
        .window {
          flex: 400px 0 0;
          display: flex;
          flex-direction: column;
        }
        #dialog {
          width: 85%;
        }
      }
    </style>
  </head>
  <body>
    <div class="window">
      <div class="browser-bar">
        <button title="Copiar end-point">Copiar</button>
        <div class="address-bar">
          <span>https://solid-geolocation.vercel.app/location</span>
        </div>
      </div>
      <div class="content">
        <div class="pane">
          <div class="json-window">
            <pre>
              <code>\n${JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
        </div>
    <div id="map" class="pane"></div>
    </div>
    <div class="footer">
        <a href="/docs"></a>
        <a
          href="https://github.com/solidsnk86"
          target="_blank"
          rel="noopener noreferrer"
          ></a
        >
      </div>
    </div>
    <dialog></dialog>
    <div id="dialog">
      <h2><span id="chin">📌</span> Obtené más precisión</h2>
      <p>
        Podés utilizar este endpoint donde se deberá proporcionar (latitud y
        longitud), ejemplo:
        <a
          href="https://solid-geolocation.vercel.app/geolocation?lat=-33.0548161&lon=-65.6174943"
        >
          https://solid-geolocation.vercel.app/geolocation?lat=-33.0548161&lon=-65.6174943
        </a>
        Estos datos se pueden obtener a través de la API de geolocalización del
        navegador. Te dejo la documentación
        <a
          href="/docs"
          target="_blank"
        >
          aquí.
        </a>
      </p>
    </div>
    <script type="module">
      import { highlight } from "https://esm.sh/sugar-high";
      import cleanIndent from "https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/indent-cleaner.js";

      const lat = ${data.coords.latitude} || -33.2991;
      const lon = ${data.coords.longitude} || -66.3547;

      const map = L.map("map").setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 6,
      }).addTo(map);
      L.marker([lat, lon]).addTo(map);

      const code = document.querySelector("pre > code");
      code.innerHTML = highlight(cleanIndent(code.innerText));
      const footer = document.querySelector(".footer")

      const machineWriter = ({ text, childrenIndex, delay = 50, output }) => {
          output = output.children[childrenIndex]
          let i = 0;
          const interval = setInterval(() => {
            output.textContent += text[i];
            i++;
            console.log(text[i])
            if (i >= text.length) clearInterval(interval);
          }, delay)
      }
      machineWriter({ text: "Documentación", childrenIndex: 0, delay: 80, output: footer })
      machineWriter({ text: "Hecho con ❤ por @solidSnk86", childrenIndex: 1, output: footer })

      const generateDialog = async (content) => {
        const url = document.querySelector(".address-bar");
        const dialog = document.querySelector("dialog");
        dialog.innerHTML = content;
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url.textContent);
          dialog.showModal();
          const controller = new AbortController();
          setTimeout(() => {
            dialog.style.animation = "fadeOut 0.2s ease-in-out";
            dialog.addEventListener(
              "animationend",
              () => {
                if (dialog.open) {
                  dialog.close();
                  dialog.style.animation = "fadeIn 0.2s ease-in-out";
                  dialog.open = false;
                  controller.abort();
                }
              },
              { signal: controller.signal, once: true }
            );
          }, 2500);
        } else {
          console.error("Navigator doesnt allowed clipboard");
        }
      };

      document.querySelector("button").addEventListener("click", async () => {
        await generateDialog("✅ End-point Copiado!");
      });

      const startTimer = (get = () => {}, timeStop = 10) => {
        let count = 0;
        const interval = setInterval(() => {
          count++;
          get(count);
          if (count >= timeStop) clearInterval(interval);
        }, 1000);
      };


      startTimer((counter) => {
        if (counter === 5) {
          const dialog = document.getElementById("dialog");
          const controller = new AbortController();
          dialog.style.display = "block";

          document.addEventListener("click", (event) => {
            if (dialog && !dialog.contains(event.target)) {
              dialog.style.animation = "exit 0.3s ease-out";
              dialog.addEventListener(
                "animationend",
                () => {
                  dialog.style.display = "none";
                },
                { signal: controller.signal, once: true }
              );
            }
          });
        }
      }, 5);
    </script>
  </body>
</html>
`
