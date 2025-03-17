import { mockAccountModel } from '@/__tests__/domain/mocks'
import { AccountModel, AuthenticationModel } from '@/domain/models'
import { AddAccount, AddAccountParams, AddAccountResult, Authentication, AuthenticationParams, LoadAccountByToken } from '@/domain/usecases'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AddAccountResult> {
      return Promise.resolve(true)
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return Promise.resolve({
        accessToken: 'any_token',
        name: mockAccountModel().name
      })
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenStub()
}
