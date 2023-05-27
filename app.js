"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs = require("fs");
var path = require("path");
var cors = require("cors");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get('/', function (req, res) {
    res.json({ message: 'Welcome to Fran\'s API!' });
});
var wordleData = JSON.parse(fs.readFileSync('wordle.json', 'utf-8'));
app.get('/wordle', function (req, res) {
    res.json(wordleData);
});
var matchData = JSON.parse(fs.readFileSync('gamesdata.json', 'utf-8'));
app.get('/lol-match-data', function (req, res) {
    res.json(matchData);
});
app.get('/get-draft', function (req, res) {
    var randomNum = Math.floor(Math.random() * Object.entries(matchData).length);
    res.json(Object.entries(matchData)[randomNum]);
});
app.get('/champion-icons/:championName', function (req, res) {
    var championName = req.params.championName;
    var imagePath = path.join(__dirname, 'champion_icons', "".concat(championName, ".png"));
    fs.readFile(imagePath, function (err, data) {
        if (err) {
            console.error(err);
            res.status(404).json({ error: 'Image not found' });
        }
        else {
            res.set('Content-Type', 'image/png');
            res.send(data);
        }
    });
});
app.listen(PORT, function () {
    console.log('Server running on port', PORT);
});
