import QRCode from 'qrcode'

export class QrCodeController {
  static async generateQrCode(req, res) {
    const { url } = req.query
    if (!url) {
      return res.status(400).send(`
          <html>
      <head>
        <title>Error - Parámetro faltante</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f8f9fa;
            color: #333;
            padding: 40px;
          }
          h4 {
            color: #d9534f;
            font-size: 24px;
          }
          p {
            font-size: 18px;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          }
          a:hover {
            background: #0056b3;
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
