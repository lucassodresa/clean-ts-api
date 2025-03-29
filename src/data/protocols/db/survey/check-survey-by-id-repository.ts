
export type CheckSurveyByIdRepositoryResult = boolean
export interface CheckSurveyByIdRepository {
  checkById (id: string): Promise<CheckSurveyByIdRepositoryResult>
}
