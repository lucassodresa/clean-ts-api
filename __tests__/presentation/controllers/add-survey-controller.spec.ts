import { mockAddSurvey, mockValidation } from '@/__tests__/presentation/mocks'
import { AddSurvey } from '@/domain/usecases'
import { AddSurveyController, AddSurveyControllerRequest } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import MockDate from 'mockdate'

const mockRequest = (): AddSurveyControllerRequest => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ]
})

type SutTypes = {
  sut: AddSurveyController
  validationStub: Validation
  addSurveyStub: AddSurvey
}

const makeSut = (): SutTypes => {
  const addSurveyStub = mockAddSurvey()
  const validationStub = mockValidation()
  const sut = new AddSurveyController(validationStub, addSurveyStub)

  return { sut, validationStub, addSurveyStub }
}

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })
  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    const request = mockRequest()
    await sut.handle(request)
    expect(addSpy).toBeCalledWith({ ...request, date: new Date() })
  })
  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
