import { AddAccountParams } from '@/domain/usecases'

export type AddAccountRepositoryParams = AddAccountParams
export type AddAccountRepositoryResult = boolean
export interface AddAccountRepository {
  add: (accountData: AddAccountRepositoryParams) => Promise<AddAccountRepositoryResult>
}
