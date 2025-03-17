
export type AddAccountParams = {
  name: string
  email: string
  password: string
}
export type AddAccountResult = boolean

export type AddAccount = {
  add (account: AddAccountParams): Promise<AddAccountResult>
}
