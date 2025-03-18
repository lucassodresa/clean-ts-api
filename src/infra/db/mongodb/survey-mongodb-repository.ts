import { AddSurveyRepository, AddSurveyRepositoryParams, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'
import { MongoHelper, QueryBuilder } from '@/infra/db/mongodb'

export class SurveyMongoDbRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyRepositoryParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.accountId', MongoHelper.objectId(accountId)]
                }
              }
            }
          }, 1]
        }
      })
      .build()

    const surveys: SurveyModel[] = await surveyCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey: SurveyModel = await surveyCollection.findOne({ _id: MongoHelper.objectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
