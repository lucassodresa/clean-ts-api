import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories'

export default {
  Query: {
    surveyResult: async (_: any, args: any, context: any) => adaptResolver(makeLoadSurveyResultController(), args, context)
  },

  Mutation: {
    saveSurveyResult: async (_: any, args: any, context: any) => adaptResolver(makeSaveSurveyResultController(), args, context)
  }

}
