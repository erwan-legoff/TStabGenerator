import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { apiGetMelody } from '../controllers/MelodyController'

dotenv.config()

const app = express()
app.use(bodyParser.json())

app.get('/melody', apiGetMelody)

export default app
