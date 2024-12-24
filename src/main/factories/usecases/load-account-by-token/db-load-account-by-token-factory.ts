import env from '@/main/config/env'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoDbRepository } from '@/infra/db/mongodb/account/account-mongodb-repository'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoDbRepository = new AccountMongoDbRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoDbRepository)
}
