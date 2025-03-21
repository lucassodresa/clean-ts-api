import { app } from '@/main/config/app'
import { noCache } from '@/main/middlewares'
import request from 'supertest'

describe('NoCache Middleware', () => {
  test('Should disable cache', async () => {
    const routeName = '/test_no_cache'
    app.get(routeName, noCache, (req, res) => {
      res.send()
    })

    await request(app).get(routeName)
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
