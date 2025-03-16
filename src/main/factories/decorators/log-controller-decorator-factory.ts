import { LogControllerDecorator } from '@/main/decorators'
import { LogMongoDbRepository } from '@/infra/db/mongodb'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new LogMongoDbRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
