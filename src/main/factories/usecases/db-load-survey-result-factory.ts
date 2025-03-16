import { DbLoadSurveyResult } from '@/data/usecases'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyMongoDbRepository, SurveyResultMongoDbRepository } from '@/infra/db/mongodb'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoDbRepository = new SurveyResultMongoDbRepository()
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveyResult(surveyResultMongoDbRepository, surveyMongoDbRepository)
}
