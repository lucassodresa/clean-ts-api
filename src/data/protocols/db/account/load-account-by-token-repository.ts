import { LoadAccountByTokenResult } from '@/domain/usecases'

export type LoadAccountByTokenRepositoryResult = LoadAccountByTokenResult
export interface LoadAccountByTokenRepository {
  loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepositoryResult>
}
