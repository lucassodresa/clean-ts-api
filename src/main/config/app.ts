import { setupSwagger } from './swagger'
import { setupStaticFiles } from './static-files'
import { setupMiddlewares } from './middlewares'
import { setupRoutes } from './routes'
import express from 'express'

const app = express()
setupSwagger(app)
setupStaticFiles(app)
setupMiddlewares(app)
setupRoutes(app)

export { app }
