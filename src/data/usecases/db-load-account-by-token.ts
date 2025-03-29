import { Decrypter, LoadAccountByTokenRepository } from '@/data/protocols'
import { LoadAccountByToken, LoadAccountByTokenResult } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByTokenResult> {
    let decryptedToken: string
    try {
      decryptedToken = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
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
