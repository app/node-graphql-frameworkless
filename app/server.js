import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema }  from 'graphql-tools'
import hello from 'hello'

const host = '0.0.0.0'
const port = '3080'

const typeDefs = `
  ${(hello.schema.Type || '')}
  type Query {
    ${hello.schema.Query}
  }
  type Mutation {
    placeHolder: Int
    ${(hello.schema.Mutation || '')}
  }
`

var resolvers = {
  Query: {
    ...hello.resolvers.Query,
  },
  Mutation: {
    placeHolder: () => 0,
    ...hello.resolvers.Mutation,
  },
  ...hello.resolvers.Custom
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()
const whiteList = ['http://localhost','*']
const corsOptions = {
  origin: (origin, callback) =>  callback(null, whiteList.includes('*') || whiteList.includes(origin)),
  credentials: true,
}
app.use( cors(corsOptions),)
app.use('/graphql', graphqlHTTP( async (req) => {
  const context = { req }
  return {
    schema: schema,
    graphiql: true,
    context,
  }
}))
app.listen(port, host, () => console.log(`Node.js API server is listening on http://${host}:${port}/graphql`))
