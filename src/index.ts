import express from 'express';
import cors from 'cors';
import valibot from 'valibot';

const app = express()
const PORT = process.env.PORT ?? 3000

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8080',
  'http://localhost:8080'
]

app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (ACCEPTED_ORIGINS.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  }
}))

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`)
})
