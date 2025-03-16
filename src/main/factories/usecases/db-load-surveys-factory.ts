import { SurveyMongoDbRepository } from '@/infra/db/mongodb'
import { LoadSurveys } from '@/domain/usecases'
import { DbLoadSurveys } from '@/data/usecases'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveys(surveyMongoDbRepository)
}
