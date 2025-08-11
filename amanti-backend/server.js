const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { host: '0.0.0.0', port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 GraphQL endpoint ready at ${url}graphql`);
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});

