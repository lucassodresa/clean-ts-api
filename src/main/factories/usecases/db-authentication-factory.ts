import env from '@/main/config/env'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { AccountMongoDbRepository } from '@/infra/db/mongodb'
import { DbAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'

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
