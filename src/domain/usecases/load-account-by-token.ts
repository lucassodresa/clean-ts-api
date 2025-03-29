export type LoadAccountByTokenResult = {
  id: string
}
export interface LoadAccountByToken {
  load (accessToken: string, role?: string): Promise<LoadAccountByTokenResult>
}
