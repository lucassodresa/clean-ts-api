import { mockAddAccountParams } from '@/__tests__/domain/mocks'
import { AccountMongoDbRepository, MongoHelper } from '@/infra/db/mongodb'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Account MongoDB Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoDbRepository => {
    return new AccountMongoDbRepository()
  }

  describe('add()', () => {
    test('should return an account on add success', async () => {
      const sut = makeSut()
      const isValid = await sut.add(mockAddAccountParams())
      expect(isValid).toBeTruthy()
    })
  })

  describe('loadByEmail()', () => {
    test('should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(mockAddAccountParams())
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeDefined()
      expect(account.id).toBeDefined()
      expect(account.name).toBe('any_name')
      expect(account.password).toBe('any_password')
    })

    test('should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeNull()
    })
  })

  describe('checkByEmail()', () => {
    test('should return true if email is valid', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(mockAddAccountParams())
      const exists = await sut.checkByEmail('any_email@mail.com')
      expect(exists).toBeTruthy()
    })

    test('should return false if email is not valid', async () => {
      const sut = makeSut()
      const exists = await sut.loadByEmail('any_email@mail.com')
      expect(exists).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne(mockAddAccountParams())
      const { _id: userId } = res.ops[0]
      expect(res.ops[0]?.accessToken).toBeUndefined()
      await sut.updateAccessToken(userId, 'any_token')
      const account = await accountCollection.findOne({ _id: MongoHelper.objectId(userId) })
      expect(account).toBeDefined()
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken()', () => {
    test('should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeDefined()
      expect(account.id).toBeDefined()
    })

    test('should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeDefined()
      expect(account.id).toBeDefined()
    })

    test('should return an account on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeFalsy()
    })

    test('should return an account on loadByToken if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeDefined()
      expect(account.id).toBeDefined()
    })

    test('should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeNull()
    })
  })
})
