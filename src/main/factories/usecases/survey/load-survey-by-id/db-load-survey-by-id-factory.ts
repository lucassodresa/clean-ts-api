import { SurveyMongoDbRepository } from '@/infra/db/mongodb/survey/survey-mongodb-repository'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { DbLoadSurveyById } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveyById(surveyMongoDbRepository)
}
