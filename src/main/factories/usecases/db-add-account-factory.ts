import { DbAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/cryptography'
import { AccountMongoDbRepository } from '@/infra/db/mongodb'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoDbRepository = new AccountMongoDbRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoDbRepository, accountMongoDbRepository)
}
