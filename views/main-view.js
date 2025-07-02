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
      document.querySelector('button').addEventListener('click', async () => {
        const url = document.getElementById('url')
        const copied = document.querySelector('footer section span small')
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url.textContent)
          copied.style.display = 'inline-flex'
          setTimeout(() => copied.style.display = "none", 3000)
        } else {
          console.error('Navigator doesnt allowed clipboard')
        }
      })
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
          --sh-sign: #9d63d8;
          --sh-string: #ffffff;
          --sh-keyword: lightgreen;
          --sh-comment: #ffffff;
          --sh-jsxliterals: #ffffff;
        }
      }
      body {
        width: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
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
      }
      footer section {
        display: flex;
        justify-content: space-between;
        items-align: center;
        padding-inline: 8px;
      }
      footer section span {
        border: 1px solid #333;  
      }
      footer section span a {
        padding-right: 6px;
      }
      footer section span small {
        display: none;
        padding-block: 4.5px;
        padding-inline: 6px;
        color: lightgreen;
        border-left: 1px solid #333;
        background: linear-gradient(
        135deg,
        rgba(0, 128, 0, 0.2),
        rgba(0, 255, 0, 0.2)
      );
      }
      button {
        border: none;
        margin: 0;
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
    </style>
  </head>
  <body>
    <pre>
      <code>\n${JSON.stringify(data, null, 2)}</code>
    </pre>
    <footer>
      <section>
        <span
          ><button title="Copy">Copy url path</button>
          <a id="url" href="https://solid-geolocation.vercel.app/location"
            >https://solid-geolocation.vercel.app/location</a
          >
          <small>✅ Copied!</small>
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
  </body>
</html>
`
