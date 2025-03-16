import { DbLoadAccountByToken } from '@/data/usecases'
import { LoadAccountByToken } from '@/domain/usecases'
import { JwtAdapter } from '@/infra/cryptography'
import { AccountMongoDbRepository } from '@/infra/db/mongodb'
import { env } from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoDbRepository = new AccountMongoDbRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoDbRepository)
}
