import { Collection, MongoClient, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (data: any): any => {
    const { _id, ...collectionWithoutId } = data
    return {
      ...collectionWithoutId,
      id: _id.toString()
    }
  },
  mapCollection: (collection: any[]): any[] => {
    return collection.map(item => MongoHelper.map(item))
  },
  objectId: (id: string): ObjectId => {
    return new ObjectId(id)
  }
}
