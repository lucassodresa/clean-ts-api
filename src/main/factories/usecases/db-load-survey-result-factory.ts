import { LoadSurveyResult } from '@/domain/usecases'
import { DbLoadSurveyResult } from '@/data/usecases'
import { SurveyResultMongoDbRepository, SurveyMongoDbRepository } from '@/infra/db/mongodb'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoDbRepository = new SurveyResultMongoDbRepository()
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveyResult(surveyResultMongoDbRepository, surveyMongoDbRepository)
}
