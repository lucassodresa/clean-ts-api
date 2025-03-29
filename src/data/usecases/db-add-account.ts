import { AddAccountRepository, CheckAccountByEmailRepository, Hasher } from '@/data/protocols'
import { AddAccount, AddAccountParams, AddAccountResult } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountParams): Promise<AddAccountResult> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    if (exists) {
      return false
    }
    const hashedPassword = await this.hasher.hash(accountData.password)
    const isValid = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })
    return isValid
  }
}
