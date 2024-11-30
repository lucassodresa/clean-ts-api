import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoDbRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoDbRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import {
  Controller
} from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12

  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoDbRepository = new AccountMongoDbRepository()
  const dbAddAccount = new DbAddAccount(
    bcryptAdapter,
    accountMongoDbRepository
  )
  const validationComposite = makeSignUpValidation()
  const signUpController = new SignUpController(dbAddAccount, validationComposite)
  const logErrorRepository = new LogMongoDbRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
