import { AddAccount, AddAccountParams, AddAccountResult, Authentication, AuthenticationParams, AuthenticationResult, LoadAccountByToken, LoadAccountByTokenResult } from '@/domain/usecases'

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
        name: 'any_name'
      })
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role: string): Promise<LoadAccountByTokenResult> {
      const result = { id: 'any_id' }
      return Promise.resolve(result)
    }
  }
  return new LoadAccountByTokenStub()
}
