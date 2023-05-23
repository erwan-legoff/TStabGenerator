import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { apiGetMelody } from '../controllers/MelodyController'
import morgan from 'morgan'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/melody', apiGetMelody)

export default app
