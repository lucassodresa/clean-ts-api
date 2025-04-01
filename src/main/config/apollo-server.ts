import resolvers from '@/main/graphql/resolvers'
import typeDefs from '@/main/graphql/type-defs'
import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { GraphQLError } from 'graphql'

const checkError = (error: GraphQLError, errorName: string): boolean => {
  const errors = [error.name, error.originalError?.name]
  return errors.includes(errorName)
}

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  errors?.forEach((error) => {
    response.data = undefined

    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
      return
    }

    if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
      return
    }

    if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
      return
    }

    response.http.status = 500
  })
}

export const setupApolloServer = (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [
      {
        requestDidStart: () => ({
          willSendResponse: ({ response, errors }) => handleErrors(response, errors)
        })
      }
    ]
  })

  server.applyMiddleware({ app })
}
