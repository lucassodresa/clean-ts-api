import { DbLoadSurveys } from '@/data/usecases'
import { LoadSurveys } from '@/domain/usecases'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveys(surveyMongoDbRepository)
}
