import { HttpRequest, HttpResponse, Controller, AddAccount, Validation, Authentication } from './signup-protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly addAcccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }

      const { name, email, password } = httpRequest.body
      await this.addAcccount.add({
        name,
        email,
        password
      })
      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
