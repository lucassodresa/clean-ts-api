import { DbLoadSurveys } from '@/data/usecases'
import { LoadSurveysRepository } from '@/data/protocols'
import { mockLoadSurveysRepository } from '@/__tests__/data/mocks'
import { mockSurveysModel } from '@/__tests__/domain/mocks'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  return { sut, loadSurveysRepositoryStub }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const accountId = '123'
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load(accountId)
    expect(loadAllSpy).toBeCalledWith(accountId)
  })

  test('Should return a list of Surveys on Success', async () => {
    const { sut } = makeSut()
    const accountId = '123'
    const surveys = await sut.load(accountId)
    expect(surveys).toEqual(mockSurveysModel())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const accountId = '123'
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(accountId)
    await expect(promise).rejects.toThrow()
  })
})
