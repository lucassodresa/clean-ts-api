import { mockLoadSurveyByIdRepository } from '@/__tests__/data/mocks'
import { LoadSurveyByIdRepository } from '@/data/protocols'
import { DbLoadAnswersBySurvey } from '@/data/usecases'

  type SutTypes = {
    sut: DbLoadAnswersBySurvey
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
  }

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdRepositoryStub)

  return { sut, loadSurveyByIdRepositoryStub }
}

describe('DbLoadAnswersBySurvey', () => {
  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadAnswers('any_id')
    expect(loadByIdSpy).toBeCalledWith('any_id')
  })

  test('Should return answers on Success', async () => {
    const { sut } = makeSut()
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([
      'any_answer',
      'other_answer'
    ])
  })

  test('Should return empty array if LoadSurveyByIdRepository return null', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([])
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.loadAnswers('any_id')
    await expect(promise).rejects.toThrow()
  })
})
