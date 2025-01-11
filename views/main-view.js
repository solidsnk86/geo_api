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
      const code = document.querySelector('pre > code');
      code.innerHTML = highlight(code.innerText);
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
      font-family: 'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono', Menlo,
        monospace;
      line-height: 1.5;
    }
    section {
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
    .card {
      margin: 0 auto;
      padding: .5em;
      width: fit-content;
      background: #000;
      text-align: center;
      border-radius: 8px;
      position: relative;
    }
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    .card::after,
    .card::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      background: conic-gradient(
        from var(--angle),
        #ff4545,
        #00ff99,
        #006aff,
        #ff0095,
        #ff4545
      );
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      z-index: -1;
      padding: 1px;
      border-radius: 8px;
      animation: 3.5s spin linear infinite;
    }
    .card::before {
      filter: blur(1.5rem);
      opacity: 0.5;
      animation: 3s spin linear infinite;
    }
    @keyframes spin {
      to {
        --angle: 360deg;
      }
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
  </style>
  </head>
  <body>
    <pre>
      <code>${JSON.stringify(data, null, 2)}</code>
    </pre>
    <section>
      <div class="card">
      <a href="https://github.com/solidsnk86/" target="_blank" rel="noopener noreferrer nofollow" class="solid" aria-label="View profile on GitHub">
      Made with 🤍 by @solidSnk86
      </a>
    </div>
    </section>
  </body>
</html>
`;
