import express from 'express';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const cache = setupCache({
  maxAge: 21600
})

const api = axios.create({
  adapter: cache.adapter
})

app.get('/', (req, res) => {
  res.status(200).send('Welcome to <a href="https://github.com/tobimori/streamdeck-shields">StreamDeck Shields.io Custom Endpoint</a> by tobimori 👋') 
});

app.get('/plain/downloads/:id', (req, res) => {
  console.log(`[${new Date()}] Received GET /plain/downloads/${req.params.id}`);
  api({ 'url': 'https://appstore.elgato.com/streamDeckPlugin/catalog.json', method: 'get' })
    .then(async (response) => {
      let downloads;
      for (let e of response.data.plugins) {
        if (e.identifier === req.params.id) {
          downloads = `${e.downloads}`;
          break;
        }
      };
      downloads ? res.status(200).send(downloads) : res.status(404).send('identifier not found');
    })
    .catch(function (error) {
      res.status(500).send(error);
      console.log(`[${new Date()}] 500 Internal Server Error`, error);
    })
}); 


app.get('/json/downloads/:id', (req, res) => {
  console.log(`[${new Date()}] Received GET /json/downloads/${req.params.id}`);
  api({ 'url': 'https://appstore.elgato.com/streamDeckPlugin/catalog.json', method: 'get' })
    .then(async (response) => {
      let downloads;
      for (let e of response.data.plugins) {
        if (e.identifier === req.params.id) {
          downloads = `${e.downloads}`;
          break;
        }
      };
      downloads ? res.status(200).send({
        "identifier": req.params.id,
        "downloads": downloads,
      }) : res.status(404).send({
        "error": "identifier not found",
      }) 

    })
    .catch(function (error) {
      res.status(500).send({
        "error": error
      })
      console.log(`[${new Date()}] 500 Internal Server Error`, error);
    })
}); 

app.get('/shields/downloads/:id', (req, res) => {
  console.log(`[${new Date()}] Received GET /shields/downloads/${req.params.id}`);
  api({'url': 'https://appstore.elgato.com/streamDeckPlugin/catalog.json', method: 'get'})
    .then(async (response) => {
      let downloads = "error whilst retrieving data";
      for (let e of response.data.plugins) {
        if (e.identifier === req.params.id) {
          downloads = `${e.downloads}`;
          break;
        }
      };
      res.status(200).send({
        "schemaVersion": 1,
        "label": "downloads",
        "message": downloads,
        "color": downloads === "error whilst retrieving data" && "critical" || "blue",
        "style": "flat", 
        "isError": downloads === "error whilst retrieving data",
      })
    })
    .catch(function (error) {
      res.status(500).send({
        "error": error
      })
      console.log(`[${new Date()}] 500 Internal Server Error`, error);
    })
}); 

app.listen(process.env.PORT, () => {
  console.log(`[${new Date()}] Server started on port ${process.env.PORT}`)
});