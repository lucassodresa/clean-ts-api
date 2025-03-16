import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const routesDirecttory = path.join(__dirname, '..', 'routes')
  readdirSync(routesDirecttory).map(async file => {
    if (file.includes('.test.') || file.endsWith('.map')) return

    const filePath = path.join(routesDirecttory, file)
    const fileImported = await import(filePath)
    fileImported.default(router)
  })
}
