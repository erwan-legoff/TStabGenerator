import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { apiGetAbc } from '../controllers/AbcController'
import { apiGetMelody } from '../controllers/MelodyController'
import { apiGetOneNote } from '../controllers/OneNoteController'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/melody', apiGetMelody)
app.get('/note', apiGetOneNote)
app.get('/note/abc', apiGetAbc)

export default app
