import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-acccount-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (authenticationModel: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authenticationModel.email)
    return null
  }
}
