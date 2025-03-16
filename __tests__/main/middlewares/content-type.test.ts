import { app } from '@/main/config/app'
import request from 'supertest'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    const routeName = '/test_content_type'
    app.get(routeName, (req, res) => {
      res.send()
    })

    await request(app).get(routeName)
      .expect('content-type', /json/)
  })
  test('Should return xml content type when forced', async () => {
    const routeName = '/test_content_type_xml'
    app.get(routeName, (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app).get(routeName)
      .expect('content-type', /xml/)
  })
})
