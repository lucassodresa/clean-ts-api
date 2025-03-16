import { MongoHelper } from '@/infra/db/mongodb'
import { LogErrorRepository } from '@/data/protocols'

export class LogMongoDbRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
