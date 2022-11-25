import { ApolloServer } from '@apollo/server'
import typeDefs from '../schema/typeDefs.js'
import resolvers from '../schema/resolvers.js'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
})

export default server
