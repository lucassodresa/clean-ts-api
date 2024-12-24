import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-acccount-by-token-repository'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { AccountModel } from '@/domain/models/account'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const decryptedToken = await this.decrypter.decrypt(accessToken)
    if (!decryptedToken) {
      return null
    }

    const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    if (!account) {
      return null
    }

    return account
  }
}
