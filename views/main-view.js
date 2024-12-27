export const mainView = ({ data }) => `
<!DOCTYPE html><html lang="en">
  <head>
    <title>Solid Geolocation</title>
    <meta property="og:description" content="Obtiene información detallada de la IP y ubicación." >
     <meta property="og:image" content="https://raw.githubusercontent.com/solidsnk86/calcagni-gabriel/refs/heads/master/public/screen-geolocation_api.png" >
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

      .solid {
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

      .solid:hover img {
        filter: drop-shadow(0 0 20px #0078D7);
        transition: all 1s ease;
      }
    </style>
  </head>
  <body>
    <pre>
<code>${JSON.stringify(data, null, 2)}</code>
    </pre>
    <a href="https://github.com/solidsnk86/" target="_blank" rel="noopener noreferrer nofollow" class="solid" aria-label="View profile on GitHub">
      Made with 💙 by 
      <img src="https://raw.githubusercontent.com/solidsnk86/portfolio-mgc-2024/master/public/solidsnk86.png" alt="Solid Snake PixelArt" style="image-rendering: pixelated;" width="50" height="50" />
    </a>
  </body>
</html>
`