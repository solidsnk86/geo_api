export const excepctionQR = () => `
<html>
<head>
<title>Error - Parámetro faltante</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
    body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f8f9fa;
    color: #333;
    padding: 40px;
    margin: 0;
    }
    .container {
    max-width: 420px;
    margin: 0 auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.07);
    padding: 30px 16px 20px 16px;
    }
    h4 {
    color: #d9534f;
    font-size: 1.5rem;
    }
    p {
    font-size: 1.1rem;
    }
    a {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-size: 1rem;
    transition: background 0.2s;
    }
    a:hover {
    background: #0056b3;
    }
    @media (max-width: 600px) {
    body { padding: 12px; }
    .container { padding: 16px 8px 12px 8px; }
    h4 { font-size: 1.18rem; }
    p, a { font-size: 1rem; }
    }
</style>
</head>
<body>
<div class="container">
    <h4>Parámetro faltante</h4>
    <p>Debes enviar la URL a convertir en código QR mediante el parámetro <code>url</code>.</p>
    <p>Ejemplo:</p>
    <div><code>https://solid-geolocation.vercel.app/qr?url=https://neo-wifi.vercel.app</code></div>
    <a href="/qr?url=https://neo-wifi.vercel.app">Probar con ejemplo</a>
</div>
</body>
</html>
`
