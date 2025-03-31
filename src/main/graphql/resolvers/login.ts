import { adaptResolver } from '@/main/adapters'
import { makeLoginController } from '@/main/factories'

export default {
  Query: {
    login: async (_: any, args: any) => adaptResolver(makeLoginController(), args)

  }
}
