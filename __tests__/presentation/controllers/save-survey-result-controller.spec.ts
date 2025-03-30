import { mockSurveyResultModel } from '@/__tests__/domain/mocks'
import { mockLoadAnswersBySurvey, mockSaveSurveyResult } from '@/__tests__/presentation/mocks'
import { LoadAnswersBySurvey, SaveSurveyResult } from '@/domain/usecases'
import { SaveSurveyResultController, SaveSurveyResultControllerRequest } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import MockDate from 'mockdate'

const mockRequest = (answer: string = 'any_answer'): SaveSurveyResultControllerRequest => ({
  surveyId: 'any_survey_id',
  answer,
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadAnswersBySurveyStub: LoadAnswersBySurvey
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyStub = mockLoadAnswersBySurvey()
  const saveSurveyResultStub = mockSaveSurveyResult()
  const sut = new SaveSurveyResultController(loadAnswersBySurveyStub, saveSurveyResultStub)
  return {
    sut,
    loadAnswersBySurveyStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadAnswersBySurvey with correct values', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut()
    const loadAnswers = jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers')
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAnswers).toBeCalledWith(request.surveyId)
  })

  test('Should return 403 if LoadAnswersBySurvey returns empty array', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers').mockResolvedValueOnce([])
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadAnswersBySurvey throws', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest('wrong_answer')
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    const request = mockRequest()
    await sut.handle(request)
    expect(saveSpy).toBeCalledWith({
      ...request,
      date: new Date()
    })
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
