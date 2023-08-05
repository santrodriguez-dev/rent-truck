import express from 'express'
import cors from 'cors'
import { vehicleRouter, rentalRouter, userRouter } from './routes'

const app = express()
const PORT = process.env.PORT ?? 3000

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082'
]
// disable x-powered-by header
app.disable('x-powered-by')

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) { callback(null, true); return }
    if (ACCEPTED_ORIGINS.includes(origin)) { callback(null, true); return }
    callback(new Error('Not allowed by CORS'))
  }
}))

app.use(express.json())

// Routes
app
  .use('/api/vehicle', vehicleRouter)
  .use('/api/user', userRouter)
  .use('/api/rental', rentalRouter)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`)
})
