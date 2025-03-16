import { resolve } from 'path'
import express, { Express } from 'express'

export const setupStaticFiles = (app: Express): void => {
  app.use('/static', express.static(resolve(__dirname, '../../static')))
}
