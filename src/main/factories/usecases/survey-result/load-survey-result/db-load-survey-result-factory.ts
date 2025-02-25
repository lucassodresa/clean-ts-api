import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result'
import { SurveyResultMongoDbRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongodb-repository'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb/survey/survey-mongodb-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoDbRepository = new SurveyResultMongoDbRepository()
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveyResult(surveyResultMongoDbRepository, surveyMongoDbRepository)
}
