import { AddAccountRepository, AddAccountRepositoryParams, AddAccountRepositoryResult, LoadAccountByEmailRepository, LoadAccountByEmailRepositoryResult, LoadAccountByTokenRepository, LoadAccountByTokenRepositoryResult, UpdateAccessTokenRepository } from '@/data/protocols'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountRepositoryParams): Promise<AddAccountRepositoryResult> {
      return Promise.resolve(true)
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepositoryResult> {
      const result = { id: 'any_id', name: 'any_name', password: 'any_password' }
      return Promise.resolve(result)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepositoryResult> {
      const result = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
      return Promise.resolve(result)
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
