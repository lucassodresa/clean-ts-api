import { DbLoadSurveyById } from '@/data/usecases'
import { LoadSurveyById } from '@/domain/usecases'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveyById(surveyMongoDbRepository)
}
