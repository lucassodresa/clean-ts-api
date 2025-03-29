import { mockCheckSurveyByIdRepository } from '@/__tests__/data/mocks'
import { CheckSurveyByIdRepository } from '@/data/protocols'
import { DbCheckSurveyById } from '@/data/usecases'

  type SutTypes = {
    sut: DbCheckSurveyById
    checkSurveyByIdRepositoryStub: CheckSurveyByIdRepository
  }

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositoryStub = mockCheckSurveyByIdRepository()
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositoryStub)

  return { sut, checkSurveyByIdRepositoryStub }
}

describe('DbCheckSurveyById', () => {
  test('Should call CheckSurveyByIdRepository', async () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut()
    const checkByIdSpy = jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById')
    await sut.checkById('any_id')
    expect(checkByIdSpy).toBeCalledWith('any_id')
  })

  test('Should return true if CheckSurveyByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById('any_id')
    expect(exists).toBeTruthy()
  })

  test('Should return false if CheckSurveyByIdRepository returns false', async () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById').mockResolvedValueOnce(false)
    const exists = await sut.checkById('any_id')
    expect(exists).toBeFalsy()
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
