import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    surveyCollection = await MongoHelper.getCollection('surveys')

    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey with no access token provided', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'https://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        }).expect(403)
    })

    test('Should return 204 on add survey with a valid access token provided', async () => {
      const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: '123',
        role: 'admin'
      })
      const { _id: userId } = res.ops[0]
      const accessToken = sign({ id: userId }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: userId
      }, {
        $set: { accessToken }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'https://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        }).expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys with no access token provided', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 200 on load surveys with a valid access token', async () => {
      const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: '123'
      })
      const { _id: userId } = res.ops[0]
      const accessToken = sign({ id: userId }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: userId
      }, {
        $set: { accessToken }
      })
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            }
          ],
          date: new Date()
        }
      ])
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
