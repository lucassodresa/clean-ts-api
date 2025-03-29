import { mockEncrypter, mockHashComparer, mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository } from '@/__tests__/data/mocks'
import { mockAuthentication } from '@/__tests__/domain/mocks'
import { Encrypter, HashComparer, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { DbAuthentication } from '@/data/usecases'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}
const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockAuthentication())
    expect(loadByEmailSpy).toBeCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockRejectedValueOnce(new Error('Error on LoadAccountByEmailRepository'))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(null)
    const authenticationModel = await sut.auth(mockAuthentication())
    expect(authenticationModel).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const fakeAuthentication = mockAuthentication()
    const fakeAccount = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.auth(fakeAuthentication)
    expect(compareSpy).toBeCalledWith(fakeAuthentication.password, fakeAccount.password)
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error('Error on HashComparer'))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const authenticationModel = await sut.auth(mockAuthentication())
    expect(authenticationModel).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    const fakeAuthentication = mockAuthentication()
    const fakeAccount = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.auth(fakeAuthentication)
    expect(generateSpy).toBeCalledWith(fakeAccount.id)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error('Error on HashComparer'))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an authentication model on success', async () => {
    const { sut } = makeSut()
    const fakeAuthentication = mockAuthentication()
    const { accessToken, name } = await sut.auth(fakeAuthentication)
    expect(accessToken).toBe('any_token')
    expect(name).toBe('any_name')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateAccessTokenSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    const fakeAuthentication = mockAuthentication()
    const fakeAccount = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.auth(fakeAuthentication)
    expect(updateAccessTokenSpy).toBeCalledWith(fakeAccount.id, 'any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockRejectedValueOnce(new Error('Error on HashComparer'))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
