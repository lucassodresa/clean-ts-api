import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases/add-account'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => ({
  ...mockAddAccountParams(),
  id: 'any_id'
})

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
