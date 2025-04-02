import { MongoHelper } from '@/infra/db/mongodb'
import { env } from '@/main/config/env'
import { ApolloServer, gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-integration-testing'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import { makeApolloServer } from './helpers'

let accountCollection: Collection
let surveyCollection: Collection
let apolloServer: ApolloServer

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

describe('Survey GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
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

  describe('Surveys Query', () => {
    const surveysQuery = gql`
      query surveys {
        surveys {
          id, 
          question,
          answers{
            image
            answer
          }
          date
          didAnswer
        }
      }
    `

    test('Should return surveys', async () => {
      const accessToken = await makeAccessToken()
      const now = new Date()
      await surveyCollection.insertOne({
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
        date: now
      })
      const { query } = createTestClient({
        apolloServer ,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken
          }
        }
      })
      const response: any = await query(surveysQuery)
      expect(response.data.surveys[0].id).toBeTruthy()
      expect(response.data.surveys[0].question).toBe('any_question')
      expect(response.data.surveys[0].date).toBe(now.toISOString())
      expect(response.data.surveys[0].didAnswer).toBeFalsy()
      expect(response.data.surveys[0].answers).toEqual([
        {
          answer: 'Answer 1',
          image: 'https://image-name.com'
        },
        {
          answer: 'Answer 2',
          image: null
        }
      ])
    })

    test('Should return AccessDeniedError if not token is provided', async () => {
      const now = new Date()
      await surveyCollection.insertOne({
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
        date: now
      })
      const { query } = createTestClient({ apolloServer })
      const response: any = await query(surveysQuery)
      expect(response.data).toBeFalsy()
      expect(response.errors[0].message).toBe('Access denied')
    })
  })
})
