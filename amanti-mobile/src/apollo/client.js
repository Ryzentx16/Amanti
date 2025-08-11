import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Backend URL - using exposed port for testing
const httpLink = createHttpLink({
  uri: 'https://4000-if0t862u6jw5o8als5cam-365af61e.manusvm.computer/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;

