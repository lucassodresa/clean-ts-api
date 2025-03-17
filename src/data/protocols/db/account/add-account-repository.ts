import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases'

export type AddAccountRepositoryParams = AddAccountParams
export type AddAccountRepositoryResult = AccountModel
export interface AddAccountRepository {
  add (accountData: AddAccountRepositoryParams): Promise<AddAccountRepositoryResult>
}
