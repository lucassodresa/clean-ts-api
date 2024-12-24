import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LogMongoDbRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new LogMongoDbRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
