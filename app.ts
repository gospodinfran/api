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

const wordleData = JSON.parse(fs.readFileSync('./wordle.json', 'utf-8'))

app.get('/wordle', (req, res) => {
    res.json( wordleData)
})

app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})