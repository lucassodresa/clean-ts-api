import { MongoHelper as sut } from './mongo-helper'

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
