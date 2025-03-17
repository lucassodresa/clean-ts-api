import { LoadSurveys } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export type LoadSurveysControllerRequest = {
  accountId: string
}

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (request: LoadSurveysControllerRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(request.accountId)
      const hasSurveys = surveys.length > 0
      return hasSurveys ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
