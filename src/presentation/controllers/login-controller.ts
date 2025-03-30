import { Authentication } from '@/domain/usecases'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export type LoginControllerRequest = {
  email: string
  password: string
}
export class LoginController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = request

      const authenticationModel = await this.authentication.auth({
        email,
        password
      })
      if (!authenticationModel) {
        return unauthorized()
      }

      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
