
export type CheckSurveyByIdResult = boolean

export interface CheckSurveyById {
  checkById: (id: string) => Promise<CheckSurveyByIdResult>
}
