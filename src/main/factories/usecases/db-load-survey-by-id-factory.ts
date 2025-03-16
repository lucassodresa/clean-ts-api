import { SurveyMongoDbRepository } from '@/infra/db/mongodb'
import { LoadSurveyById } from '@/domain/usecases'
import { DbLoadSurveyById } from '@/data/usecases'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveyById(surveyMongoDbRepository)
}
