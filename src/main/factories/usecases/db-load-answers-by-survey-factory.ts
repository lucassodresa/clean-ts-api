import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { LoadAnswersBySurvey } from '@/domain/usecases'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb'

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadAnswersBySurvey(surveyMongoDbRepository)
}
