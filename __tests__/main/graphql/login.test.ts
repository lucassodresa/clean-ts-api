import { MongoHelper } from '@/infra/db/mongodb'
import { ApolloServer, gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-integration-testing'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import { makeApolloServer } from './helpers'

let accountCollection: Collection
let apolloServer: ApolloServer

describe('Auth GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Login Query', () => {
    const loginQuery = gql`
      query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          name
        }
      }
    `

    test('Should return an Account on valid credentials', async () => {
      const password = 'any_password'
      const passwordHashed = await hash(password, 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: passwordHashed
      })
      const { query } = createTestClient({ apolloServer })
      const response: any = await query(loginQuery, {
        variables:
        { email: 'any_email@mail.com', password }
      })
      expect(response.data.login.accessToken).toBeDefined()
      expect(response.data.login.name).toBe('any_name')
    })

    test('Should return UnauthorizedError on invalid credentials', async () => {
      const { query } = createTestClient({ apolloServer })
      const response: any = await query(loginQuery, {
        variables: {
          email: 'any_email@mail.com',
          password: '123'
        }
      })
      expect(response.data).toBeFalsy()
      expect(response.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('SignUp Query', () => {
    const signUpMutation = gql`
      mutation signup($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
        signup(name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
          accessToken
          name
        }
      }
    `

    test('Should return an Account on valid data', async () => {
      const { mutate } = createTestClient({ apolloServer })
      const response: any = await mutate(signUpMutation, {
        variables: {
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        }
      })
      expect(response.data.signup.accessToken).toBeDefined()
      expect(response.data.signup.name).toBe('any_name')
    })

    test('Should return EmailInUseError on invalid data', async () => {
      const password = 'any_password'
      const passwordHashed = await hash(password, 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: passwordHashed
      })
      const { mutate } = createTestClient({ apolloServer })
      const response: any = await mutate(signUpMutation, {
        variables: {
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        }
      })
      expect(response.data).toBeFalsy()
      expect(response.errors[0].message).toBe('The received email is already in use')
    })
  })
})
