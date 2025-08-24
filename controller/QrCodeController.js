import QRCode from 'qrcode'

export class QrCodeController {
  static async generateQrCode(req, res) {
    const { url } = req.query
    if (!url) {
      return res.status(400).send(`
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
            body {
              padding: 12px;
            }
            .container {
              padding: 16px 8px 12px 8px;
            }
            h4 {
              font-size: 1.18rem;
            }
            p, a {
              font-size: 1rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h4>Parámetro faltante</h4>
          <p>Debes enviar la URL a convertir en código QR mediante el parámetro <code>url</code>.</p>
          <p>Ejemplo:</p>
          <a href="/qr?url=https://ejemplo.com">Probar con ejemplo</a>
        </div>
      </body>
    </html>
        `)
    }

    try {
      const qrDataUrl = await QRCode.toDataURL(url, { type: 'image/png' })

      res.send(`
        <html>
          <head>
            <title>Código QR</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 40px; 
                margin: 0;
                background: #f8f9fa;
              }
              .container {
                max-width: 420px;
                margin: 0 auto;
                background: #fff;
                border-radius: 12px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.07);
                padding: 30px 16px 20px 16px;
              }
              h1 { font-size: 2rem; }
              img { 
                max-width: 100%; 
                width: 300px;
                margin-bottom: 20px; 
                height: auto; 
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.09);
              }
              a { 
                display: inline-block; 
                padding: 10px 20px; 
                background: #007bff; 
                color: white; 
                text-decoration: none; 
                border-radius: 8px;
                font-size: 1rem;
                transition: background 0.2s;
              }
              a:hover { background: #0056b3; }
              @media (max-width: 600px) {
                body { padding: 12px; }
                .container { 
                  padding: 16px 8px 12px 8px; 
                }
                h1 { font-size: 1.3rem; }
                img { width: 100%; max-width: 100%; }
                a { font-size: 1rem; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Tu código QR</h1>
              <img src="${qrDataUrl}" alt="Código QR" />
              <br/>
              <a href="${qrDataUrl}" download="codigo-qr.png">Descargar QR</a>
            </div>
          </body>
        </html>
      `)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error al generar el código QR')
    }
  }
}
          }
        </style>
      </head>
      <body>
        <h4>Parámetro faltante</h4>
        <p>Debes enviar la URL a convertir en código QR mediante el parámetro <code>url</code>.</p>
        <p>Ejemplo:</p>
        <a href="/qr?url=https://ejemplo.com">Probar con ejemplo</a>
      </body>
    </html>
        `)
    }

    try {
      const qrDataUrl = await QRCode.toDataURL(url, { type: 'image/png' })

      res.send(`
        <html>
          <head>
            <title>Código QR</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
              img { max-width: 300px; margin-bottom: 20px; }
              a { display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 8px; }
              a:hover { background: #0056b3; }
            </style>
          </head>
          <body>
            <h1>Tu código QR</h1>
            <img src="${qrDataUrl}" alt="Código QR" />
            <br/>
            <a href="${qrDataUrl}" download="codigo-qr.png">Descargar QR</a>
          </body>
        </html>
      `)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error al generar el código QR')
    }
  }
}
