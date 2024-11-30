import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoDbRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoDbRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoDbRepository = new AccountMongoDbRepository()
  const dbAuthentication = new DbAuthentication(
    accountMongoDbRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoDbRepository
  )
  const validationComposite = makeLoginValidation()
  const loginControlller = new LoginController(validationComposite, dbAuthentication)
  const logErrorRepository = new LogMongoDbRepository()
  return new LogControllerDecorator(loginControlller, logErrorRepository)
}
