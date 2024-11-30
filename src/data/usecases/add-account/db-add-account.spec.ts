import { DbAddAccount } from './db-add-account'
import { AccountModel, AddAccountModel, AddAccountRepository, Hasher } from './db-add-account-protocols'

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  hashStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const hashStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(hashStub, addAccountRepositoryStub)
  return {
    sut,
    hashStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hashStub } = makeSut()
    const encryptSpy = jest.spyOn(hashStub, 'hash')
    const accountData = makeFakeAccountData()
    await sut.add(accountData)
    expect(encryptSpy).toBeCalledWith(accountData.password)
  })
  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, hashStub } = makeSut()
    jest.spyOn(hashStub, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccountData())
    expect(addSpy).toBeCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })
  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toEqual(makeFakeAccount())
  })
})
