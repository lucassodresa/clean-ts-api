import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb'
import env from '@/main/config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { default: app } = await import('./config/app')

    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  }).catch(console.error)
