import request from 'supertest'
import app from '@/main/config/app'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    const routeName = '/test_cors'
    app.get(routeName, (req, res) => {
      res.send()
    })

    await request(app).get(routeName)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-method', '*')
      .expect('access-control-allow-headers', '*')
  })
})
