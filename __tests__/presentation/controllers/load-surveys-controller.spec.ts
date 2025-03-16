import { mockSurveysModel } from '@/__tests__/domain/mocks'
import { mockLoadSurveys } from '@/__tests__/presentation/mocks'
import { LoadSurveys } from '@/domain/usecases'
import { LoadSurveysController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import MockDate from 'mockdate'

const mockRequest = (): HttpRequest => ({
  accountId: '123'
})

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)

  return { sut, loadSurveysStub }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toBeCalledWith(httpRequest.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveysModel()))
  })

  test('Should return 204 if load surveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockResolvedValueOnce([])
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
