import { AddAccount, Authentication } from '@/domain/usecases'
import { EmailInUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export type SignUpControllerRequest = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}
export class SignUpController implements Controller {
  constructor (
    private readonly addAcccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: SignUpControllerRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(request)
      if (validationError) {
        return badRequest(validationError)
      }

      const { name, email, password } = request
      const account = await this.addAcccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const authenticationModel = await this.authentication.auth({
        email,
        password
      })

      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
