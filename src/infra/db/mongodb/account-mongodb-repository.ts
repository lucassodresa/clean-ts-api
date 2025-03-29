import { AddAccountRepository, AddAccountRepositoryParams, AddAccountRepositoryResult, LoadAccountByEmailRepository, LoadAccountByEmailRepositoryResult, LoadAccountByTokenRepository, LoadAccountByTokenRepositoryResult } from '@/data/protocols'
import { MongoHelper } from '@/infra/db/mongodb'

export class AccountMongoDbRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountRepositoryParams): Promise<AddAccountRepositoryResult> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const isValid = result.ops[0] !== null
    return isValid
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepositoryResult> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne(
      { email },
      {
        projection: {
          _id: 1,
          name: 1,
          password: 1
        }
      }
    )
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: MongoHelper.objectId(id) }, { $set: { accessToken: token } })
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepositoryResult> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,

      $or: [
        { role },
        { role: 'admin' }
      ]
    }, {
      projection: {
        _id: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
