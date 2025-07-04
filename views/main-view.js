export const mainView = ({ data }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
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
      rel="shortcut icon"
      href="https://raw.githubusercontent.com/solidsnk86/portfolio-mgc-2024/master/public/solidsnk86.png"
      type="image/x-icon"
    />
    <meta charset="utf-8" />
    <script type="module">
      import { highlight } from 'https://esm.sh/sugar-high'
      import cleanIndent from 'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/indent-cleaner.js'

      const code = document.querySelector('pre > code')
      code.innerHTML = highlight(cleanIndent(code.innerText))

      const generateDialog = async (content) => {
        const url = document.getElementById('url')
        const dialog = document.querySelector('dialog')
        dialog.innerHTML = content
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url.textContent)
          dialog.showModal()
          const controller = new AbortController()
          setTimeout(() => {
            dialog.style.animation = 'fadeOut 0.2s ease-in-out'
            dialog.addEventListener(
              'animationend',
              () => {
                if (dialog.open) {
                  dialog.close()
                  dialog.style.animation = 'fadeIn 0.2s ease-in-out'
                  dialog.open = false
                  controller.abort()
                }
              },
              { signal: controller.signal, once: true }
            )
          }, 2500)
        } else {
          console.error('Navigator doesnt allowed clipboard')
        }
      }
      
      const startTimer = (get = () => {}, timeStop = 10) => {
        let count = 0;
        const interval = setInterval(() => {
          count++;
         get(count)
         if (count >= timeStop) clearInterval(interval)
        }, 1000)
      }

      document.querySelector('button').addEventListener('click', async () => {
        await generateDialog("✅ Copied!")
      })

      startTimer((counter) => {
        const count = document.getElementById("counter");
        if (counter === 5) {
          const dialog = document.getElementById("dialog");
          dialog.style.display = "block"

          document.addEventListener("click", (event) => {
            if (dialog && !dialog.contains(event.target)) {
              dialog.style.animation = "exit 0.3s ease-out"
              dialog.addEventListener("animationend", () => {
                dialog.remove()
              })
            }
          })
        }
      }, 5)
    
    </script>
    <style>
      :root {
        --color: #000000;
        --background-color: #ffffff;
        --sh-class: #000000;
        --sh-identifier: #000000;
        --sh-sign: rgba(0, 0, 0, 0.5);
        --sh-string: #000000;
        --sh-token-string: lightgreen;
        --sh-keyword: #000000;
        --sh-comment: #000000;
        --sh-jsxliterals: #000000;
        --dialog-bg: #f5f5f5;
        --border-color: #ccc;
        --shadow: #9d9d9d;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --color: #ffffff;
          --background-color: #000000;
          --sh-class: #ffffff;
          --sh-identifier: #ffffff;
          --sh-sign: #9d63d8;
          --sh-string: #ffffff;
          --sh-token-string: lightgreen;
          --sh-keyword: lightgreen;
          --sh-comment: #ffffff;
          --sh-jsxliterals: #ffffff;
          --dialog-bg: #202020;
          --border-color: #222;
          --shadow: #000;
        }
      }
      body {
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: var(--background-color);
        font-family: 'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono';
      }
      span {
        margin: 0;
        padding: 0;
      }
      pre {
        margin: 0;
        padding-inline: 8px;
        z-index: 1;
      }
      code {
        font-size: 2vmin;
        font-family: 'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono',
          Menlo, monospace;
        line-height: 1.5;
      }
      footer {
        width: 100%;
        position: absolute;
        bottom: 10px;
        font-size: 2vmin;
        font-family: 'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono',
          Menlo, monospace;
      }
      footer section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-inline: 8px;
      }
      footer section span {
        border: 1px solid var(--border-color);
        border-radius: 10px;
        overflow: hidden;
      }
      footer section span a {
        padding-right: 6px;
      }
      dialog {
        padding: 16px;
        border: none;
        border-radius: 4px;
        color: lightgreen;
        background: var(--dialog-bg);
        animation: fadeIn 0.2s ease-in-out;
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
      button {
        border: none;
        margin: 0;
        font-size: 2vmin;
        font-family: 'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono',
          Menlo, monospace;
        background-color: rgba(0, 0, 0, 0.5);
        padding-inline: 6px;
        padding-block: 6px;
        cursor: pointer;
      }
      button:hover {
        background-color: #9d63d8b1;
      }
      .solid {
        text-decoration: none;
        color: var(--color);
        font-size: 2vmin;
        font-family: 'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono',
          Menlo, monospace;
        display: flex;
        width: fit-content;
        align-items: center;
      }
      .solid:hover {
        color: #9d63d8;
      }
      #dialog {
        display: none;
        position: absolute;      
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        padding: 16px;
        background-color: var(--dialog-bg);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        z-index: 999;
        font-size: 2vmin;
        font-family: 'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono',
          Menlo, monospace;
          filter: drop-shadow(0 0 10px var(--shadow));
          animation: entrance 0.6s ease-in-out;
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
          transform: scale(1)
        }
        to {
          transform: scale(0);
        }
      }
    </style>
  </head>
  <body>
    <pre>
      <code>\n${(data, null, 2)}</code>
    </pre>
    <div id="dialog">
      <h2 style="text-align: center;">📍 Para obtener más precisión</h2>
      Poedés utilizar este endpoint donde deberá proporcionar (latitud y longitud), ejemplo:
      <a href="https://solid-geolocation.vercel.app/geolocation?lat=-33.0548161&lon=-65.6174943">
        https://solid-geolocation.vercel.app/geolocation?lat=-33.0548161&lon=-65.6174943
      </a>
      Estos datos se pueden obtener a través de la API de geolocalización del navegador. Te dejo esta guía: 
      <a href="https://developer.mozilla.org/es/docs/Web/API/Geolocation/getCurrentPosition#ejemplos" target="_blank" rel="noopener noreferrer">
        https://developer.mozilla.org/es/docs/Web/API/Geolocation/getCurrentPosition#ejemplos
      </a>
    </div>
    <footer>
      <section>
        <span
          ><button title="Copy">Copy end-point</button>
          <a id="url" href="https://solid-geolocation.vercel.app/location"
            >https://solid-geolocation.vercel.app/location</a
          >
        </span>
        <a
          href="https://github.com/solidsnk86/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="solid"
          aria-label="View profile on GitHub"
        >
          Made with 🤍 by @solidSnk86
        </a>
      </section>
    </footer>
    <dialog></dialog>
  </body>
</html>
`
