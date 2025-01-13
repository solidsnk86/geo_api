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
      import { highlight } from 'https://esm.sh/sugar-high';
      import cleanIndent from 'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/indent-cleaner.js';
      const code = document.querySelector('pre > code');
      code.innerHTML = highlight(cleanIndent(code.innerText));
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
        --sh-sign: rgba(214, 176, 110, 0.5);
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
      font-family: 'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono', Menlo,
        monospace;
      line-height: 1.5;
    }
    section {
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
    .solid {
      text-decoration: none;
      color: var(--color);
      font-size: 2vmin;
      font-family: 'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono', Menlo,
        monospace;
      display: flex;
      width: fit-content;
      align-items: center;  
    }
    .solid:hover {
      color: orange;
    }
  </style>
  </head>
  <body>
    <pre>
      <code>${JSON.stringify(data, null, 2)}</code>
    </pre>
    <section>
      <a href="https://github.com/solidsnk86/" target="_blank" rel="noopener noreferrer nofollow" class="solid" aria-label="View profile on GitHub">
      Made with 🤍 by @solidSnk86
      </a>
    </section>
  </body>
</html>
`;
