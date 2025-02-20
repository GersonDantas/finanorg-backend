import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { setupRoutes } from './routes'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
await setupRoutes(app)

export { app } 
