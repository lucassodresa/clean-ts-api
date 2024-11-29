import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoDbRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoDbRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import {
  Controller
} from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const salt = 12

  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoDbRepository = new AccountMongoDbRepository()
  const dbAddAccount = new DbAddAccount(
    bcryptAdapter,
    accountMongoDbRepository
  )
  const emailValidator = new EmailValidatorAdapter()
  const validationComposite = new ValidationComposite([

  ])
  const signUpController = new SignUpController(emailValidator, dbAddAccount, validationComposite)
  const logErrorRepository = new LogMongoDbRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
