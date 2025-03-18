import { mockAccountModel } from '@/__tests__/domain/mocks'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams, AddAccountResult, Authentication, AuthenticationParams, AuthenticationResult, LoadAccountByToken } from '@/domain/usecases'

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
    async auth (authentication: AuthenticationParams): Promise<AuthenticationResult> {
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
