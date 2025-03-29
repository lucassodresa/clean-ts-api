import { AddAccountRepository, Hasher, LoadAccountByEmailRepository } from '@/data/protocols'
import { AddAccount, AddAccountParams, AddAccountResult } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountParams): Promise<AddAccountResult> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (account) {
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
