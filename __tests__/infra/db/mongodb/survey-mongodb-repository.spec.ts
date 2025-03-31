import { MongoHelper, SurveyMongoDbRepository } from '@/infra/db/mongodb'
import FakeObjectId from 'bson-objectid'
import { Collection } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  const accountId = res.ops[0]._id
  return accountId
}

const makeSut = (): SurveyMongoDbRepository => {
  return new SurveyMongoDbRepository()
}

describe('Survey MongoDB Repository', () => {
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

  describe('add', () => {
    test('should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          },
          {
            answer: 'any_answer'
          }
        ],
        date: new Date()
      })
      const survey = await surveyCollection.findOne({
        question: 'any_question'
      })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll', () => {
    test('should load all surveys on success', async () => {
      const accountId = await makeAccountId()
      const survey = await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            }
          ],
          date: new Date()
        },
        {
          question: 'other_question',
          answers: [
            {
              image: 'other_image',
              answer: 'other_answer'
            }
          ],
          date: new Date()
        }
      ])
      const surveyInserted = survey.ops[0]
      const surveyResult = {
        surveyId: surveyInserted._id,
        accountId: MongoHelper.objectId(accountId),
        answer: surveyInserted.answers[0].answer,
        date: new Date()
      }
      await surveyResultCollection.insertOne(surveyResult)
      const sut = makeSut()
      const surveys = await sut.loadAll(accountId)
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe('other_question')
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('should load empty list', async () => {
      const accountId = await makeAccountId()
      const sut = makeSut()
      const surveys = await sut.loadAll(accountId)
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById', () => {
    test('should load survey by id on success', async () => {
      const response = await surveyCollection.insertOne(
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            }
          ],
          date: new Date()
        })
      const id = response.ops[0]._id
      const sut = makeSut()
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })

    test('should return null if survey does not exists', async () => {
      const sut = makeSut()
      const survey = await sut.loadById(FakeObjectId.generate())
      expect(survey).toBeFalsy()
    })
  })

  describe('loadAnswers', () => {
    test('should load answers on success', async () => {
      const response = await surveyCollection.insertOne(
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image_1',
              answer: 'any_answer_1'
            },
            {
              image: 'any_image_2',
              answer: 'any_answer_2'
            }
          ],
          date: new Date()
        })
      const survey = response.ops[0]
      const id = survey._id
      const sut = makeSut()
      const answers = await sut.loadAnswers(id)
      expect(answers).toEqual([
        survey.answers[0].answer,
        survey.answers[1].answer
      ])
    })

    test('should return empty array if survey does not exists', async () => {
      const sut = makeSut()
      const answers = await sut.loadAnswers(FakeObjectId.generate())
      expect(answers).toEqual([])
    })
  })

  describe('checkById', () => {
    test('should return true if survey exists', async () => {
      const response = await surveyCollection.insertOne(
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            }
          ],
          date: new Date()
        })
      const id = response.ops[0]._id
      const sut = makeSut()
      const exists = await sut.loadById(id)
      expect(exists).toBeTruthy()
    })

    test('should return false if survey not exists', async () => {
      const sut = makeSut()
      const exists = await sut.checkById(FakeObjectId.generate())
      expect(exists).toBeFalsy()
    })
  })
})
