import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'
import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result'
import { SurveyResultMongoDbRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongodb-repository'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoDbRepository = new SurveyResultMongoDbRepository()
  return new DbSaveSurveyResult(surveyResultMongoDbRepository, surveyResultMongoDbRepository)
}
