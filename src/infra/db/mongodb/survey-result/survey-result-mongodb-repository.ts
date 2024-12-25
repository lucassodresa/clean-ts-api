
import { MongoHelper } from '../helpers/mongo-helper'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'

export class SurveyResultMongoDbRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultsCollection = await MongoHelper.getCollection('surveyResults')
    const res = await surveyResultsCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnOriginal: false
    })

    const surveyResult = res.value
    return surveyResult && MongoHelper.map(surveyResult)
  }
}
