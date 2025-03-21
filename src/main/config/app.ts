import express from 'express'
import { setupMiddlewares } from './middlewares'
import { setupRoutes } from './routes'
import { setupStaticFiles } from './static-files'
import { setupSwagger } from './swagger'

const app = express()
setupSwagger(app)
setupStaticFiles(app)
setupMiddlewares(app)
setupRoutes(app)

export { app }
