import { Authentication } from '@/domain/usecases'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body

      const authenticationModel = await this.authentication.auth({
        email,
        password
      })
      if (!authenticationModel) {
        return unauthorized()
      }

      return ok(authenticationModel)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
