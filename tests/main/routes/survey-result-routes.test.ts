import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'
import request from 'supertest'
import { Collection } from 'mongodb'
import env from '@/main/config/env'
import { sign } from 'jsonwebtoken'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: '123'
  })
  const { _id: userId } = res.ops[0]
  const accessToken = sign({ id: userId }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: MongoHelper.objectId(userId)
  }, {
    $set: { accessToken }
  })
  return accessToken
}

describe('Survey Routes', () => {
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    surveyCollection = await MongoHelper.getCollection('surveys')

    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

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
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'https://image-name.com'
          },
          {
            answer: 'Answer 2'
          }
        ],
        date: new Date()
      })
      const surveyId = res.ops[0]._id
      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load survey result with no access token provided', async () => {
      await request(app)
        .get('/api/surveys/any_survey_id/results')
        .expect(403)
    })

    test('Should return 200 on load survey result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'https://image-name.com'
          },
          {
            answer: 'Answer 2'
          }
        ],
        date: new Date()
      })
      const surveyId = res.ops[0]._id
      await request(app)
        .get(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
