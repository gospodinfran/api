"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Fran\'s API!' });
});
const wordleData = JSON.parse(fs_1.default.readFileSync('wordle.json', 'utf-8'));
app.get('/wordle', (req, res) => {
    res.json(wordleData);
});
const matchData = JSON.parse(fs_1.default.readFileSync('gamesdata.json', 'utf-8'));
app.get('/lol-match-data', (req, res) => {
    res.json(matchData);
});
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
