export const mainView = ({ data }) => `
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
        --sh-class: #e5c049;
        --sh-identifier: #61afef;
        --sh-sign: #d19045;
        --sh-string: #98c35b;
        --sh-token-string: lightgreen;
        --sh-keyword: #c678dd;
        --sh-comment: #ffffff;
        --sh-property: #e05a50;
        --sh-jsxliterals: #61afef;
        --bg-main: #ffffff;
        --bg-desk: #2f3542;
        --win-bg: #f5f5f7;
        --dialog-bg: #f5f5f5;
        --border-color: #e6e6e6;
        --shadow: #9d9d9d;
        --btn-bg: #010101;
        --btn-color: #fff;
        --card-bg: #eee;
        --spark-color: tomato;
        --sunset-2: linear-gradient(
          90deg,
          #f06844 0%,
          #ee4c54 25%,
          #d45e95 50%,
          #9c6ca6 75%,
          #6583c1 100%
        );
        --rainbow-1: linear-gradient(
          90deg,
          #00daf4 0%,
          #5edc99 10%,
          #3861bc 20%,
          #5606ef 30%,
          #d400a5 40%,
          #ee4c54 50%,
          #ff7800 60%,
          #ffaf00 70%,
          #ffc800 80%,
          #bada6d 100%
        );

        --retro-2: linear-gradient(
          90.42deg,
          #4ab1f1 0.58%,
          #566cec 37.22%,
          #d749af 73.87%,
          #ff7c51 112.26%
        );
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --color: #ffffff;
          --background-color: #000000;
          --sh-identifier: #61afef;
          --sh-sign: #d19045;
          --sh-string: #98c35b;
          --sh-token-string: lightgreen;
          --sh-keyword: #c678dd;
          --sh-comment: #ffffff;
          --sh-property: #e05a50;
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
          --spark-color: lightgreen;
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
        font-family: "Poppins", sans-serif;
      }

      @property --rotate {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
      }

      .fancy-button {
        --btn-color: #181818;
        --radius: 999px;
        --inset: 1px;
        --animation-duration: 2.1s;
        --light-color: var(--spark-color);
        position: relative;
        border: none;
        padding: 8px 10px;
        border-radius: var(--radius);
        inset: var(--inset);
        transition: 0.3s ease-in-out;
        cursor: copy;
      }

      .fancy-button:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 0 6px var(--color));
      }

      .light::after {
        background-color: var(--btn-color);
        content: "";
        position: absolute;
        inset: var(--inset);
        border-radius: var(--radius);
      }

      .light::before {
        content: "";
        position: absolute;
        rotate: 0;
        background: conic-gradient(
          from var(--rotate),
          #00daf4 0deg,
          #5edc99 36deg,
          #3861bc 72deg,
          #5606ef 108deg,
          #d400a5 144deg,
          #ee4c54 180deg,
          #ff7800 216deg,
          #ffaf00 252deg,
          #ffc800 288deg,
          #bada6d 324deg,
          #00daf4 360deg
        );
        inset: 0;
        opacity: 0.6;
        border-radius: var(--radius);
        animation: rotate var(--animation-duration) linear infinite both;
      }

      .text {
        position: relative;
        font-weight: 600;
        color: #fff;
        z-index: 9;
      }

      @keyframes rotate {
        to {
          --rotate: 360deg;
        }
      }

      .window {
        position: relative;
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
        justify-content: space-between;
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
        transition: 0.2s ease-in-out;
        height: 20px;
      }
      .footer a:hover {
        filter:invert();
      }
      dialog {
        padding: 16px;
        border: none;
        border-radius: 4px;
        animation: fadeIn 0.2s ease-in-out;
        z-index: 999;
      }
      dialog::backdrop {
        backdrop-filter: blur(3px);
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
      @media (width <=762px) {
        .window {
          flex: 400px 0 0;
          display: flex;
          flex-direction: column;
        }
        #dialog {
          width: 85%;
        }
      }
      body:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200px;
        background: var(--rainbow-1);
        filter: blur(120px);
        border-radius: 999px;
        opacity: 0.6;
        z-index: -2;
      }
      .aside-browser-bar svg:last-child {
        padding: 5px;
        border-radius: 100%;
      }
      .aside-browser-bar svg:last-child:hover {
        padding: 5px;
        background: var(--border-color);
      }
      .menu-bar {
        display: none;
        position: absolute;
        top: 40px;
        right: 0;
        padding: 0.4rem;
        background-color: var(--win-bg);
        border-radius: 12px;
        z-index: 999;
        filter: drop-shadow(0 0 6px var(--shadow));
      }
      .menu-bar ul {
        margin: 0;
        padding: 0;
      }
      .menu-bar ul li {
        display: flex;
        gap: 8px;
        align-items: center;
        list-style: none;
        padding: 10px 14px;
        cursor: pointer;
      }
      .menu-bar ul li:hover {
        background: var(--border-color);
        border-radius: 12px;
      }
      .solid {
        background: var(--retro-2);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    </style>
  </head>

  <body>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="100%"
      height="100%"
      style="position: absolute; top: 0; left: 0; opacity: 0.1; z-index: -1"
      className="absolute top-0 left-0 opacity-[0.2]"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="9.5"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
    <main class="window">
      <section class="browser-bar">
        <button title="Copiar end-point" class="fancy-button">
          <div class="light" />
          <span class="text">Copiar</span>
        </button>
        <div class="address-bar">
          <span>https://solid-geolocation.vercel.app/location</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
          
        </div>
        <div
          style="display: flex; align-items: center; gap: 8px"
          class="aside-browser-bar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
            />
          </svg>
          <span style="opacity: 0.5">|</span>
          <img
            title="@solidSnk86"
            src="https://avatars.githubusercontent.com/u/93176365?v=4"
            alt="avatar"
            width="24"
            height="24"
            style="border-radius: 50%"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
            />
          </svg>
        </div>
        <article class="menu-bar">
          <ul>
            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
            Compartir</li>
            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
            </svg>
            Reportar bugs</li>
          </ul>
        </article>
      </section>
      <section class="content">
        <div class="pane">
          <div class="json-window">
            <pre>
              <code>\n${JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
        </div>
        <div id="map" class="pane"></div>
      </section>
      <div class="footer">
        <a href="/docs"></a>
        <a
          href="https://github.com/solidsnk86"
          target="_blank"
          rel="noopener noreferrer"
        >Hecho con ❤ por <strong class="solid">@solidSnk86</strong></a>
      </div>
    </main>
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
        <a href="/docs" target="_blank"> aquí. </a>
      </p>
    </div>
    <script type="module">
      import { highlight } from "https://esm.sh/sugar-high";
      import cleanIndent from "https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/indent-cleaner.js";

      const lat = -33.2991;
      const lon = -66.3547;

      const map = L.map("map").setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 6,
      }).addTo(map);
      L.marker([lat, lon]).addTo(map);

      const code = document.querySelector("pre > code");
      code.innerHTML = highlight(cleanIndent(code.innerText));
      const footer = document.querySelector(".footer");

      const machineWriter = ({ text, childrenIndex, delay = 50, output }) => {
        output = output.children[childrenIndex];
        let i = 0;
        const interval = setInterval(() => {
          output.textContent += text[i];
          i++;
          if (i >= text.length) clearInterval(interval);
        }, delay);
      };
      machineWriter({ text: "Documentación", childrenIndex: 0, delay: 80, output: footer })

      const generateDialog = (content) => {
        const dialog = document.querySelector("dialog");
        dialog.innerHTML = content;
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
      };

      const copyDialog = async (content) => {
        const url = document.querySelector(".address-bar");
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url.textContent);
          generateDialog(content);
        } else {
          console.error("Navigator doesnt allowed clipboard");
        }
      };

      document.querySelector("button").addEventListener("click", async () => {
        await copyDialog("✅ End-point Copiado!");
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
      }, 9);
      const dots = document.querySelector(".bi-three-dots-vertical")
      const menu = document.querySelector(".menu-bar");
      dots.addEventListener("click", (event) => {
          if (!menu.checkVisibility()) {
            menu.style.display = "block";
          } else {
            menu.style.display = "none";
          }
        });
      document.addEventListener("click", (event) => {
        if (!dots.contains(event.target) && menu && !menu.contains(event.target)) {
          menu.style.display = "none"
        }
      })
      document.querySelectorAll(".menu-bar li").forEach((li) => {
        if (li.textContent.toLowerCase().includes("compartir")) {
          li.onclick = () => {
            navigator.share({
              title: document.title,
              text: "Descubre nuestra potente aplicación basada en Node.js y Express que ofrece un servicio de geolocalización rápido y preciso, entregando datos de ubicación en formato JSON para tus proyectos innovadores.",
              url: window.location.href,
            });
          };
        }
        if (li.textContent.includes("bugs")) {
          li.onclick = () => {
            window.open(
              "https://github.com/solidsnk86/geo_api/issues/new",
              "_blank"
            );
          };
        }
      });
    </script>
  </body>
</html>
`
