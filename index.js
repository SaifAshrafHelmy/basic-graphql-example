import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

// server setup
const server = new ApolloServer({
  // typeDefs (schema)
  typeDefs: typeDefs,
  // resolvers
  resolvers: resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Graphql server is listening on port 4000`);
