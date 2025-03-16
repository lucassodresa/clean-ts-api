import { SaveSurveyResult } from '@/domain/usecases'
import { DbSaveSurveyResult } from '@/data/usecases'
import { SurveyResultMongoDbRepository } from '@/infra/db/mongodb'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoDbRepository = new SurveyResultMongoDbRepository()
  return new DbSaveSurveyResult(surveyResultMongoDbRepository, surveyResultMongoDbRepository)
}
