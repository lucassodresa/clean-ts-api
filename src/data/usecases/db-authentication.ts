
import {
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from '@/data/protocols'
import { Authentication, AuthenticationParams, AuthenticationResult } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationParams): Promise<AuthenticationResult> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (!account) {
      return null
    }

    const isValid = await this.hashComparer.compare(authentication.password, account.password)
    if (!isValid) {
      return null
    }

    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)

    return {
      accessToken,
      name: account.name
    }
  }
}
