import { AccountModel } from '@/domain/models'

export type AddAccountParams = Omit<AccountModel, 'id'>
export type AddAccountResult = boolean

export type AddAccount = {
  add (account: AddAccountParams): Promise<AddAccountResult>
}
