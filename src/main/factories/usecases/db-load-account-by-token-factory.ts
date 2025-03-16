import env from '@/main/config/env'
import { LoadAccountByToken } from '@/domain/usecases'
import { DbLoadAccountByToken } from '@/data/usecases'
import { JwtAdapter } from '@/infra/cryptography'
import { AccountMongoDbRepository } from '@/infra/db/mongodb'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoDbRepository = new AccountMongoDbRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoDbRepository)
}
