import { MongoHelper as sut } from '@/infra/db/mongodb'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accoountCollection = await sut.getCollection('accounts')
    expect(accoountCollection).toBeDefined()
    await sut.disconnect()
    accoountCollection = await sut.getCollection('accounts')
    expect(accoountCollection).toBeDefined()
  })
})
