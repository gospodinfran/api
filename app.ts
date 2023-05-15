import express, { Request, Response } from 'express'
import fs from 'fs'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Fran\'s API!'})
})

const wordleData = JSON.parse(fs.readFileSync('wordle.json', 'utf-8'))

app.get('/wordle', (req, res) => {
    res.json(wordleData)
})

const matchData = JSON.parse(fs.readFileSync('gamesdata.json', 'utf-8'))

app.get('/lol-match-data', (req, res) => {
    res.json(matchData)
})

app.get('/get-draft', (req, res) => {
    let randomNum = Math.floor(Math.random() * Object.entries(matchData).length)
    res.json(Object.entries(matchData)[randomNum])
})

app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})