
export type CheckAccountByEmailRepositoryResult = boolean

export interface CheckAccountByEmailRepository {
  checkByEmail (email: string): Promise<CheckAccountByEmailRepositoryResult>
}
