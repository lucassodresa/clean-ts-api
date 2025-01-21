import { loginPath } from './paths'
import { errorSchema, loginParamsSchema, accountSchema } from './schemas'
import { badRequest, unauthorized, serverError, notFound } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean TS API',
    description: 'Course Clean Architecture TDD',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'

  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    unauthorized,
    serverError,
    notFound
  }
}
