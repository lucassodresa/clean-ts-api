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

describe('SurveyResult GraphQL', () => {
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

  describe('SurveyResult Query', () => {
    const surveyResultQuery = gql`
      query surveyResult ($surveyId: String!) {
        surveyResult (surveyId: $surveyId) {
          question,
          answers{
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }
    `

    test('Should return SurveyResult', async () => {
      const accessToken = await makeAccessToken()
      const now = new Date()
      const surveyResponse = await surveyCollection.insertOne({
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
      const response: any = await query(surveyResultQuery, {
        variables: {
          surveyId: surveyResponse.ops[0]._id.toString()
        }
      })
      expect(response.data.surveyResult.question).toBe('any_question')
      expect(response.data.surveyResult.date).toBe(now.toISOString())
      expect(response.data.surveyResult.answers).toEqual([
        {
          answer: 'Answer 1',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        },
        {
          answer: 'Answer 2',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        }
      ])
    })

    test('Should return AccessDeniedError if not token is provided', async () => {
      const surveyResponse = await surveyCollection.insertOne({
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
      const { query } = createTestClient({ apolloServer })
      const response: any = await query(surveyResultQuery, {
        variables: {
          surveyId: surveyResponse.ops[0]._id.toString()
        }
      })
      expect(response.data).toBeFalsy()
      expect(response.errors[0].message).toBe('Access denied')
    })
  })

  describe('SaveSurveyResult Query', () => {
    const saveSurveyResultMutation = gql`
      mutation saveSurveyResult ($surveyId: String!, $answer: String!) {
        saveSurveyResult (surveyId: $surveyId, answer: $answer) {
          question,
          answers{
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }
    `

    test('Should return SaveSurveyResult', async () => {
      const accessToken = await makeAccessToken()
      const now = new Date()
      const surveyResponse = await surveyCollection.insertOne({
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

      const { mutate } = createTestClient({
        apolloServer ,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken
          }
        }
      })
      const response: any = await mutate(saveSurveyResultMutation, {
        variables: {
          surveyId: surveyResponse.ops[0]._id.toString(),
          answer: 'Answer 1'
        }
      })
      expect(response.data.saveSurveyResult.question).toBe('any_question')
      expect(response.data.saveSurveyResult.date).toBe(now.toISOString())
      expect(response.data.saveSurveyResult.answers).toEqual([
        {
          answer: 'Answer 1',
          count: 1,
          percent: 100,
          isCurrentAccountAnswer: true
        },
        {
          answer: 'Answer 2',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        }
      ])
    })
  })
})
