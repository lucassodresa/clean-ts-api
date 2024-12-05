import { LogMongoDbRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new LogMongoDbRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
