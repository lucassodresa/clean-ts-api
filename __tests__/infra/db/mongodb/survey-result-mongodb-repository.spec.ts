import { AccountModel, SurveyModel } from '@/domain/models'
import { MongoHelper, SurveyResultMongoDbRepository } from '@/infra/db/mongodb'
import { Collection, ObjectId } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer_1',
        image: 'any_image'
      },
      {
        answer: 'any_answer_2'
      },
      {
        answer: 'any_answer_3'
      }
    ],
    date: new Date()
  })
  const survey = res.ops[0]
  return MongoHelper.map(survey)
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    date: new Date()
  })
  const account = res.ops[0]
  return MongoHelper.map(account)
}

const makeSut = (): SurveyResultMongoDbRepository => {
  return new SurveyResultMongoDbRepository()
}

describe('SurveyResult MongoDB Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    accountCollection = await MongoHelper.getCollection('accounts')

    await Promise.all([
      surveyCollection.deleteMany({}),
      surveyResultCollection.deleteMany({}),
      accountCollection.deleteMany({})
    ])
  })

  describe('save', () => {
    test('should add a survey result if it is new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultCollection.findOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id)
      })

      expect(surveyResult).toBeTruthy()
    })

    test('should update survey result if it is not new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultCollection
        .find({
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id)
        })
        .toArray()

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId', () => {
    test('should load survey result - account 1', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const account2 = await makeAccount()
      await surveyResultCollection.insertMany([
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date()
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account2.id),
          answer: survey.answers[0].answer,
          date: new Date()
        }

      ])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account.id)
      expect(surveyResult).toBeTruthy()
      expect(String(surveyResult.surveyId)).toBe(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('should load survey result - account 2', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const account2 = await makeAccount()
      const account3 = await makeAccount()
      await surveyResultCollection.insertMany([
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date()
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account2.id),
          answer: survey.answers[1].answer,
          date: new Date()
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account3.id),
          answer: survey.answers[1].answer,
          date: new Date()
        }

      ])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account2.id)
      expect(surveyResult).toBeTruthy()
      expect(String(surveyResult.surveyId)).toBe(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(67)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(33)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('should load survey result - account 3', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const account2 = await makeAccount()
      const account3 = await makeAccount()
      await surveyResultCollection.insertMany([
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date()
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account2.id),
          answer: survey.answers[1].answer,
          date: new Date()
        }
      ])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account3.id)
      expect(surveyResult).toBeTruthy()
      expect(String(surveyResult.surveyId)).toBe(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(false)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('should return null if there is no survey result', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account.id)
      expect(surveyResult).toBeNull()
    })
  })
})
