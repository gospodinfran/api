import express = require('express');
import { Request, Response } from 'express'
import fs = require('fs');
import path = require('path');
import cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Fran\'s API!'})
})

const wordleData = JSON.parse(fs.readFileSync('wordle.json', 'utf-8'));

app.get('/wordle', (req, res) => {
    res.json(wordleData)
})

const matchData = JSON.parse(fs.readFileSync('gamesdata.json', 'utf-8'));

app.get('/lol-match-data', (req, res) => {
    res.json(matchData)
})

app.get('/get-draft', (req, res) => {
    let randomNum = Math.floor(Math.random() * Object.entries(matchData).length)
    res.json(Object.entries(matchData)[randomNum])
})

app.get('/champion-icons/:championName', (req, res) => {
    const championName = req.params.championName;
    const imagePath = path.join(__dirname, 'champion_icons', `${championName}.png`);
    
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).json({ error: 'Image not found' })
      } else {
        res.set('Content-Type', 'image/png');
        res.send(data);
      }
    })
})

app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})
