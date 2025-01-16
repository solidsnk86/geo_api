import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import extractLocationInfo from "./services/get-location-info.js";
import { mainView } from "./views/main-view.js";
import rateLimit from 'express-rate-limit'
import { dirname, resolve } from 'path'
import { fileURLToPath } from "url";
import { writeFile } from "fs/promises";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

const corsOptions = {
  methods: ['GET', 'POST'],
  maxAge: 86400,
};

app.use(express.json());
app.use(cors(corsOptions));
app.disable("x-powered-by");

const limiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 300,
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde'
})

app.use(limiter)
dotenv.config();

app.get("/", async (req, res, next) => {
  try {
    const locationInfo = extractLocationInfo(req);

    res.status(200).send(mainView({ data: locationInfo }));
  } catch (error) {
    next(error);
  }
});

app.get("/location", (req, res) => {
  try {
    const locationInfo = extractLocationInfo(req);

    const mapAirports = (payload) => Object.keys(payload).map((key) => {
      const { iata, name, lat, lon } = payload[key]
      return iata ? { iata, name, latitude: lat, longitude: lon } : null
    }).filter(Boolean)
    
    const withFetch = (url, filename, mapper) =>
      fetch(url)
        .then(res => res.json())
        .then(async data => {
          const filepath = resolve(__dirname, `../${filename}.json`)
          const content = mapper(data)
          await writeFile(filepath, JSON.stringify(content, null, 2))
          console.log(`Added ${content.length} at ${filename} in ${__dirname} ✨`)
        })
    
    Promise.all([
      withFetch('https://cdn.jsdelivr.net/gh/mwgg/Airports/airports.json', 'airports', mapAirports)
    ]).catch(error => console.error(error) || process.exit(1))

    res.status(200).json(locationInfo);
  } catch (err) {
    res.status(500).json({ message: "Server Error " + err });
  }
});

app.get("/weather", async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    res.status(400).json({ message: "Latitud y longitud son requeridas" });
  }

  try {
    const API_ID = process.env.NEXT_WEATHER_API;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_ID}`
    );
    const jsonData = await response.json();

    if (!response.ok) {
      res
        .status(400)
        .json({ status: res.statusCode, message: response.statusText });
    }

    res.status(200).json(jsonData);
  } catch (err) {
    res
      .status(500)
      .json({ status: res.statusCode, message: "Server Error" + " " + err });
  }
});



const PORT = process.env.PORT || 3639;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
