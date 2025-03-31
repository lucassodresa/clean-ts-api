import { mockLoadAnswersBySurveyRepository } from '@/__tests__/data/mocks'
import { LoadAnswersBySurveyRepository } from '@/data/protocols'
import { DbLoadAnswersBySurvey } from '@/data/usecases'

  type SutTypes = {
    sut: DbLoadAnswersBySurvey
    loadAnswersBySurveyRepositoryStub: LoadAnswersBySurveyRepository
  }

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyRepositoryStub = mockLoadAnswersBySurveyRepository()
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositoryStub)

  return { sut, loadAnswersBySurveyRepositoryStub }
}

describe('DbLoadAnswersBySurvey', () => {
  test('Should call LoadAnswersBySurveyRepository', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers')
    await sut.loadAnswers('any_id')
    expect(loadByIdSpy).toBeCalledWith('any_id')
  })

  test('Should return answers on Success', async () => {
    const { sut } = makeSut()
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([
      'any_answer_1',
      'any_answer_2'
    ])
  })

  test('Should return empty array if LoadAnswersBySurveyRepository return empty array', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers').mockResolvedValueOnce([])
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([])
  })

  test('Should throw if LoadAnswersBySurveyRepository throws', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers').mockRejectedValueOnce(new Error())
    const promise = sut.loadAnswers('any_id')
    await expect(promise).rejects.toThrow()
  })
})
