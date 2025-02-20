import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const fieldName = fileURLToPath(process.env.ROUTES_PATH ?? import.meta.url)
const dirName = dirname(fieldName)
const routesPath = process.env.ROUTES_PATH ?? join(dirName, '../routes')

export const setupRoutes = async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api', router)
  
  await Promise.all(
    readdirSync(routesPath).map(async file => {
      if (!file.endsWith('.map')) {
        (await import(`${routesPath}/${file}`)).default(router)
      }
    })
  )
} 
