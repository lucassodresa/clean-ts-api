import env from '@/main/config/env'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoDbRepository } from '@/infra/db/mongodb/account/account-mongodb-repository'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoDbRepository = new AccountMongoDbRepository()
  return new DbAuthentication(
    accountMongoDbRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoDbRepository
  )
}
