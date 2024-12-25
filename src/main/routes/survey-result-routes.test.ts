import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result with no access token provided', async () => {
      await request(app)
        .put('/api/surveys/any_survey_id/results')
        .send({
          answer: 'any_answer'
        }).expect(403)
    })
  })
})
