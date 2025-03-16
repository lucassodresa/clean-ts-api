import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db/mongodb'

export class AccountMongoDbRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    return MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: MongoHelper.objectId(id) }, { $set: { accessToken: token } })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,

      $or: [
        { role },
        { role: 'admin' }
      ]
    })
    return account && MongoHelper.map(account)
  }
}
