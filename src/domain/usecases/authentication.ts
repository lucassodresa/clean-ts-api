
export type AuthenticationParams = {
  email: string
  password: string
}
export type AuthenticationResult = {
  accessToken: string
  name: string

}

export type Authentication = {
  auth (authentication: AuthenticationParams): Promise<AuthenticationResult>
}
