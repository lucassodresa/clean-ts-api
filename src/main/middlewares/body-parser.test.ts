import request from 'supertest'
import app from '@/main/config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    const routeName = '/test_body_parser'
    app.post(routeName, (req, res) => {
      res.send(req.body)
    })

    await request(app).post(routeName).send({ name: 'any_name' }).expect({ name: 'any_name' })
  })
})
